-- Update inscription_leads programme check to use 'DTE' instead of 'DTI'
ALTER TABLE public.inscription_leads DROP CONSTRAINT IF EXISTS inscription_leads_programme_check;

DROP POLICY IF EXISTS "Anyone can submit inscription leads" ON public.inscription_leads;

CREATE POLICY "Anyone can submit inscription leads"
ON public.inscription_leads
FOR INSERT
TO public
WITH CHECK (
  ((length(TRIM(BOTH FROM full_name)) >= 2) AND (length(TRIM(BOTH FROM full_name)) <= 120))
  AND ((length(TRIM(BOTH FROM phone)) >= 6) AND (length(TRIM(BOTH FROM phone)) <= 40))
  AND (programme = ANY (ARRAY['DTE'::text, 'DTI'::text, 'ALC'::text, 'Prépa Sport-Études'::text, 'Prépa Canada'::text, 'Prépa France'::text, 'Prépa Angleterre'::text]))
);