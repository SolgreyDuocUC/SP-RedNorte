-- Relación N:N entre centros (V4) y especialidades (V3) que ofrece cada uno.
-- Los hospitales concentran más especialidades; los CESFAM/SAR se enfocan en
-- Medicina General y Pediatría (atención primaria).
INSERT INTO centro_especialidad (id_centro, id_especialidad) VALUES
-- Hospital Regional de Antofagasta
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 9), (1, 10),
-- CESFAM Corvallis
(2, 1), (2, 2),
-- Hospital Carlos Cisternas (Calama)
(3, 1), (3, 2), (3, 4), (3, 5), (3, 9),
-- CESFAM El Yodo
(4, 1), (4, 2),
-- Hospital Regional de Iquique
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), (5, 7), (5, 9), (5, 10),
-- CESFAM Iquique Sur
(6, 1), (6, 2),
-- Hospital Dr. Juan Noé Crevani (Arica)
(7, 1), (7, 2), (7, 3), (7, 5), (7, 7), (7, 9),
-- CESFAM Arica Norte
(8, 1), (8, 2),
-- Hospital Regional San José del Carmen (Copiapó)
(9, 1), (9, 2), (9, 4), (9, 5), (9, 9), (9, 10),
-- Hospital de La Serena
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5), (10, 6), (10, 7), (10, 8), (10, 9), (10, 10),
-- CESFAM Coquimbo
(11, 1), (11, 2),
-- SAR Mejillones
(12, 1)
ON CONFLICT DO NOTHING;
