CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE IF NOT EXISTS public.inscription_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  programme TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'nouveau',
  source TEXT NOT NULL DEFAULT 'site_web',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.inscription_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit inscription leads" ON public.inscription_leads;
DROP POLICY IF EXISTS "Admins can view inscription leads" ON public.inscription_leads;
DROP POLICY IF EXISTS "Admins can update inscription leads" ON public.inscription_leads;
DROP POLICY IF EXISTS "Owners can delete inscription leads" ON public.inscription_leads;

CREATE POLICY "Anyone can submit inscription leads"
ON public.inscription_leads
FOR INSERT
TO public
WITH CHECK (
  length(trim(full_name)) BETWEEN 2 AND 120
  AND length(trim(phone)) BETWEEN 6 AND 40
  AND programme IN ('DTI', 'ALC', 'Prépa Sport-Études', 'Prépa Canada', 'Prépa France', 'Prépa Angleterre')
);

CREATE POLICY "Admins can view inscription leads"
ON public.inscription_leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Admins can update inscription leads"
ON public.inscription_leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'owner'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owners can delete inscription leads"
ON public.inscription_leads
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'owner'));

DROP TRIGGER IF EXISTS update_inscription_leads_updated_at ON public.inscription_leads;
CREATE TRIGGER update_inscription_leads_updated_at
BEFORE UPDATE ON public.inscription_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_inscription_leads_created_at ON public.inscription_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inscription_leads_status ON public.inscription_leads (status);

CREATE TABLE IF NOT EXISTS public.admin_team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view team members" ON public.admin_team_members;
DROP POLICY IF EXISTS "Owners can insert team members" ON public.admin_team_members;
DROP POLICY IF EXISTS "Owners can update team members" ON public.admin_team_members;
DROP POLICY IF EXISTS "Owners can delete team members" ON public.admin_team_members;

CREATE POLICY "Admins can view team members"
ON public.admin_team_members
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owners can insert team members"
ON public.admin_team_members
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owners can update team members"
ON public.admin_team_members
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'owner'))
WITH CHECK (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owners can delete team members"
ON public.admin_team_members
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'owner'));

DROP TRIGGER IF EXISTS update_admin_team_members_updated_at ON public.admin_team_members;
CREATE TRIGGER update_admin_team_members_updated_at
BEFORE UPDATE ON public.admin_team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.blog_articles ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft';
UPDATE public.blog_articles
SET status = CASE WHEN is_published = true THEN 'published' ELSE 'draft' END
WHERE status IS NULL OR status = 'draft';
CREATE INDEX IF NOT EXISTS idx_blog_articles_schedule ON public.blog_articles (status, scheduled_at, created_at DESC);

ALTER TABLE public.events ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft';
UPDATE public.events
SET status = CASE WHEN is_published = true THEN 'published' ELSE 'draft' END,
    published_at = CASE WHEN is_published = true AND published_at IS NULL THEN created_at ELSE published_at END
WHERE status IS NULL OR status = 'draft' OR published_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_events_schedule ON public.events (status, scheduled_at, event_date DESC);

ALTER TABLE public.photos ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.photos ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.photos ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.photos ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';
UPDATE public.photos
SET status = CASE WHEN is_published = true THEN 'published' ELSE 'draft' END,
    published_at = CASE WHEN is_published = true AND published_at IS NULL THEN created_at ELSE published_at END
WHERE status IS NULL OR published_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_photos_schedule ON public.photos (status, scheduled_at, created_at DESC);

DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view roles" ON public.user_roles;
DROP POLICY IF EXISTS "Owners can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Owners can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins and owners can view roles" ON public.user_roles;

CREATE POLICY "Admins and owners can view roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owners can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owners can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'owner'));

UPDATE public.user_roles
SET role = 'owner'
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email IN ('enguenemolo14@gmail.com', 'delmarstudios14@gmail.com')
);

CREATE OR REPLACE FUNCTION public.auto_assign_first_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.email IN ('enguenemolo14@gmail.com', 'delmarstudios14@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'owner')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$function$;