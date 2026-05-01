import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");

  if (!supabaseUrl || !serviceKey || !anonKey) {
    console.error("Missing env", { hasUrl: !!supabaseUrl, hasService: !!serviceKey, hasAnon: !!anonKey });
    return json({ error: "Configuration Supabase manquante" }, 500);
  }

  const authHeader = req.headers.get("Authorization") ?? "";
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const adminClient = createClient(supabaseUrl, serviceKey);

  const { data: authData, error: authError } = await userClient.auth.getUser();
  if (authError || !authData.user) return json({ error: "Non authentifié" }, 401);

  const { data: isOwner, error: roleError } = await userClient.rpc("has_role", {
    _user_id: authData.user.id,
    _role: "owner",
  });
  if (roleError || !isOwner) return json({ error: "Seul un owner peut ajouter un admin" }, 403);

  const body = await req.json().catch(() => null) as { email?: string; password?: string; display_name?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password ?? "";
  const displayName = body?.display_name?.trim() || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Email invalide" }, 400);
  if (password.length < 8) return json({ error: "Mot de passe trop court" }, 400);

  const { data: created, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: displayName ? { display_name: displayName } : undefined,
  });

  if (createError || !created.user) return json({ error: createError?.message ?? "Création impossible" }, 400);

  const { error: roleInsertError } = await adminClient
    .from("user_roles")
    .insert({ user_id: created.user.id, role: "admin" });

  if (roleInsertError) return json({ error: roleInsertError.message }, 400);

  const { error: teamError } = await adminClient
    .from("admin_team_members")
    .insert({ user_id: created.user.id, email, display_name: displayName, created_by: authData.user.id });

  if (teamError) return json({ error: teamError.message }, 400);

  return json({ ok: true, user_id: created.user.id });
});
