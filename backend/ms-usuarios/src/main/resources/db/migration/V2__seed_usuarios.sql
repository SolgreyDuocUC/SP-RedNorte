-- Usuarios de staff de demo (uno por rol funcional). Contraseña compartida
-- de demo para todos: "RedNorte2026!" (hash BCrypt, valida con BCryptPasswordEncoder).
INSERT INTO users (id, run, nombre, segundo_nombre, apellido_paterno, apellido_materno, numero_telefono, direccion, password, email, enabled) VALUES
('b0000000-0000-0000-0000-000000000001', '11111111-1', 'Sofía', 'Ester', 'Ramírez', 'Toledo', '+56912340001', 'Av. Argentina 1962, Antofagasta', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', 'admin@rednorte.cl', true),
('b0000000-0000-0000-0000-000000000002', '8888888-K', 'Matías', 'Andrés', 'Fernández', 'Cortés', '+56912340002', 'Av. Argentina 1962, Antofagasta', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', 'm.fernandez@rednorte.cl', true),
('b0000000-0000-0000-0000-000000000003', '7777777-6', 'Daniela', 'Paz', 'Soto', 'Herrera', '+56912340003', 'Av. Héroes de la Concepción 502, Iquique', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', 'd.soto@rednorte.cl', true),
('b0000000-0000-0000-0000-000000000004', '6666666-2', 'Ignacio', 'Esteban', 'Vargas', 'Molina', '+56912340004', 'Av. Argentina 3945, Antofagasta', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', 'i.vargas@rednorte.cl', true),
('b0000000-0000-0000-0000-000000000005', '5555555-9', 'Carolina', 'Andrea', 'Bravo', 'Sánchez', '+56912340005', '18 de Septiembre 1000, Arica', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', 'c.bravo@rednorte.cl', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (user_id, role_id) VALUES
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001'), -- Sofía -> ADMIN
('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002'), -- Matías -> MEDICO
('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002'), -- Daniela -> MEDICO
('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000003'), -- Ignacio -> ENFERMERIA
('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000004')  -- Carolina -> ADMINISTRATIVO
ON CONFLICT DO NOTHING;
