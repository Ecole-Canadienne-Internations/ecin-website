-- Update inscription_leads programme constraint to include ITA
ALTER TABLE public.inscription_leads DROP CONSTRAINT IF EXISTS inscription_leads_programme_check;

DROP POLICY IF EXISTS "Anyone can submit inscription leads" ON public.inscription_leads;
CREATE POLICY "Anyone can submit inscription leads"
ON public.inscription_leads
FOR INSERT
TO public
WITH CHECK (
  length(TRIM(BOTH FROM full_name)) >= 2
  AND length(TRIM(BOTH FROM full_name)) <= 120
  AND length(TRIM(BOTH FROM phone)) >= 6
  AND length(TRIM(BOTH FROM phone)) <= 40
  AND programme = ANY (ARRAY['DTE'::text, 'DTI'::text, 'ALC'::text, 'ITA'::text, 'Prépa Sport-Études'::text, 'Prépa Canada'::text, 'Prépa France'::text, 'Prépa Angleterre'::text])
);

-- Create public storage bucket for site photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-photos', 'site-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Public read
DROP POLICY IF EXISTS "Public can view site photos" ON storage.objects;
CREATE POLICY "Public can view site photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-photos');

-- Admins can upload/update/delete
DROP POLICY IF EXISTS "Admins can upload site photos" ON storage.objects;
CREATE POLICY "Admins can upload site photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-photos' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'owner')));

DROP POLICY IF EXISTS "Admins can update site photos" ON storage.objects;
CREATE POLICY "Admins can update site photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-photos' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'owner')));

DROP POLICY IF EXISTS "Admins can delete site photos" ON storage.objects;
CREATE POLICY "Admins can delete site photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-photos' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'owner')));