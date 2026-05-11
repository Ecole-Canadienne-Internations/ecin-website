
DROP POLICY IF EXISTS "Admins can manage photos" ON public.photos;
CREATE POLICY "Admins and owners can manage photos" ON public.photos
  FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'owner'))
  WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'owner'));

DROP POLICY IF EXISTS "Admins can manage articles" ON public.blog_articles;
CREATE POLICY "Admins and owners can manage articles" ON public.blog_articles
  FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'owner'))
  WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'owner'));

DROP POLICY IF EXISTS "Admins can manage events" ON public.events;
CREATE POLICY "Admins and owners can manage events" ON public.events
  FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'owner'))
  WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'owner'));
