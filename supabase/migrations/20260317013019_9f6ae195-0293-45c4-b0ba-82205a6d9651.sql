
-- Create a trigger to auto-assign admin role for the first admin email
CREATE OR REPLACE FUNCTION public.auto_assign_first_admin()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'enguenemolo14@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created_assign_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.auto_assign_first_admin();
