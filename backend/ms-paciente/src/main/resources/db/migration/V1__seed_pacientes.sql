-- Pacientes de demo de la red RedNorte (macrozona norte de Chile).
-- Contraseña compartida de demo: "RedNorte2026!" (hash BCrypt).
INSERT INTO patients (id, identifier_type, identifier_value, first_name, last_name, created_date, gender, phone, email, address, password, active) VALUES
('1', 'RUN', '12345678-5', 'Juan Ignacio', 'Pérez Soto', '2024-01-15 09:00:00', 'MALE', '+56911110001', 'juan.perez@example.cl', 'Av. Argentina 1200, Antofagasta', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', true),
('2', 'RUN', '9876543-3', 'María Fernanda', 'González Rojas', '2024-02-20 10:30:00', 'FEMALE', '+56911110002', 'maria.gonzalez@example.cl', 'Av. Iquique 800, Antofagasta', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', true),
('3', 'RUN', '15234567-4', 'Carlos Andrés', 'Muñoz Fuentes', '2024-03-05 08:15:00', 'MALE', '+56911110003', 'carlos.munoz@example.cl', 'Av. Granaderos 1500, Calama', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', true),
('4', 'RUN', '18765432-7', 'Valentina Alejandra', 'Silva Vega', '2024-03-18 14:45:00', 'FEMALE', '+56911110004', 'valentina.silva@example.cl', 'Camino Costero 300, Calama', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', true),
('5', 'RUN', '20111222-2', 'Pedro Pablo', 'Hernández Castro', '2024-04-02 11:00:00', 'MALE', '+56911110005', 'pedro.hernandez@example.cl', 'Av. Almirante Latorre 100, Mejillones', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', true),
('6', 'RUN', '17888999-0', 'Camila Isidora', 'Torres Vidal', '2024-04-22 16:20:00', 'FEMALE', '+56911110006', 'camila.torres@example.cl', 'Av. Salvador Allende 1900, Iquique', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', true),
('7', 'RUN', '9345678-5', 'Francisco Javier', 'Rivas Bravo', '2024-05-10 09:40:00', 'MALE', '+56911110007', 'francisco.rivas@example.cl', 'Av. Arturo Prat 450, Tocopilla', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', true),
('8', 'RUN', '14567890-0', 'Antonia Belén', 'Contreras Muñoz', '2024-05-28 13:10:00', 'FEMALE', '+56911110008', 'antonia.contreras@example.cl', '18 de Septiembre 800, Arica', '$2b$12$BLeCCSgIFcSSv2HIF3/hJup8wMDLe03jidbWkRUk4RTPicn56eqZy', true)
ON CONFLICT (id) DO NOTHING;
