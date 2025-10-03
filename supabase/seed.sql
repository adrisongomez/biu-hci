-- Este archivo se ejecuta automáticamente cuando corres `supabase db reset`.
-- Es ideal para añadir datos iniciales para tu desarrollo local.

-- Añadir el ítem "Dashboard" a la tabla drawer_items
INSERT INTO public.drawer_items (label, icon, route, "order") VALUES
 ('Dashboard', 'view-dashboard', '/(drawer)/dashboard', 0),
 ('Calendario', 'view-dashboard', '/appoiments/active', 0),
 ('Historial', 'view-dashboard', '/appoiments/history', 0);
