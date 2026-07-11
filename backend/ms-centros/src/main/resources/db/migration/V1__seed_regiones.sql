-- Poblado de las 16 regiones oficiales de Chile.
INSERT INTO regiones (id_region, nombre) VALUES
(1, 'Región Metropolitana de Santiago'),
(2, 'Arica y Parinacota'),
(3, 'Tarapacá'),
(4, 'Antofagasta'),
(5, 'Atacama'),
(6, 'Coquimbo'),
(7, 'Valparaíso'),
(8, 'Libertador General Bernardo O''Higgins'),
(9, 'Maule'),
(10, 'Ñuble'),
(11, 'Biobío'),
(12, 'La Araucanía'),
(13, 'Los Ríos'),
(14, 'Los Lagos'),
(15, 'Aysén del General Carlos Ibáñez del Campo'),
(16, 'Magallanes y de la Antártica Chilena')
ON CONFLICT (id_region) DO NOTHING;

SELECT setval(pg_get_serial_sequence('regiones', 'id_region'), COALESCE((SELECT MAX(id_region) FROM regiones), 1));
