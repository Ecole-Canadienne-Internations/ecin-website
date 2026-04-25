DROP POLICY IF EXISTS "Anyone can read published events" ON public.events;
CREATE POLICY "Anyone can read published events"
ON public.events
FOR SELECT
TO public
USING (is_published = true AND (published_at IS NULL OR published_at <= now()));

DROP POLICY IF EXISTS "Anyone can view published photos" ON public.photos;
CREATE POLICY "Anyone can view published photos"
ON public.photos
FOR SELECT
TO public
USING (is_published = true AND (published_at IS NULL OR published_at <= now()));