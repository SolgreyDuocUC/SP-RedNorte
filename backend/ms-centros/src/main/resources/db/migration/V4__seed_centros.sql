-- Poblado de centros de salud de la red RedNorte (macrozona norte de Chile:
-- Arica y Parinacota, Tarapacá, Antofagasta, Atacama y Coquimbo).
-- id_comuna referencia las comunas insertadas en V2__seed_comunas.sql.
INSERT INTO centros (id_centro, nombre, direccion, telefono, correo_electronico, id_comuna, estado_centro) VALUES
(1, 'Hospital Regional de Antofagasta Dr. Leonardo Guzmán', 'Av. Argentina 1962', '+56552652000', 'contacto@hraguzman.rednorte.cl', 64, 'active'),
(2, 'CESFAM Corvallis', 'Av. Argentina 3945', '+56552223344', 'cesfam.corvallis@rednorte.cl', 64, 'active'),
(3, 'Hospital Carlos Cisternas', 'Av. Granaderos 2530', '+56552354000', 'contacto@hospitalcalama.rednorte.cl', 65, 'active'),
(4, 'CESFAM El Yodo', 'Calle Vivar 1854', '+56552341122', 'cesfam.elyodo@rednorte.cl', 65, 'active'),
(5, 'Hospital Regional Dr. Ernesto Torres Galdames', 'Av. Héroes de la Concepción 502', '+56572395000', 'contacto@hospitaliquique.rednorte.cl', 57, 'active'),
(6, 'CESFAM Iquique Sur', 'Av. Salvador Allende 2260', '+56572413322', 'cesfam.sur@rednorte.cl', 57, 'active'),
(7, 'Hospital Dr. Juan Noé Crevani', '18 de Septiembre 1000', '+56582204500', 'contacto@hospitalarica.rednorte.cl', 53, 'active'),
(8, 'CESFAM Arica Norte', 'Av. Capitán Ávalos 400', '+56582231122', 'cesfam.aricanorte@rednorte.cl', 53, 'active'),
(9, 'Hospital Regional San José del Carmen', 'Los Carrera 1320', '+56522465000', 'contacto@hospitalcopiapo.rednorte.cl', 73, 'active'),
(10, 'Hospital de La Serena', 'Av. Balmaceda 916', '+56512338000', 'contacto@hospitallaserena.rednorte.cl', 82, 'active'),
(11, 'CESFAM Coquimbo', 'Av. Videla 1665', '+56512327744', 'cesfam.coquimbo@rednorte.cl', 83, 'active'),
(12, 'SAR Mejillones', 'Av. Almirante Latorre 250', '+56552621188', 'sar.mejillones@rednorte.cl', 66, 'active')
ON CONFLICT (id_centro) DO NOTHING;

SELECT setval(pg_get_serial_sequence('centros', 'id_centro'), COALESCE((SELECT MAX(id_centro) FROM centros), 1));
