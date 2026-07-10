-- Script de Poblado Territorial para ms-centros (regiones, comunas y centros médicos)
-- Compatible con MySQL y PostgreSQL

INSERT INTO regiones (id, nombre) VALUES
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
(16, 'Magallanes y de la Antártica Chilena');

INSERT INTO comunas (id, nombre, region_id) VALUES
    -- REGIÓN METROPOLITANA (region_id = 1)
    (1, 'SANTIAGO', 1), (2, 'CERRILLOS', 1), (3, 'CERRO NAVIA', 1), (4, 'CONCHALÍ', 1), (5, 'EL BOSQUE', 1),
    (6, 'ESTACIÓN CENTRAL', 1), (7, 'HUECHURABA', 1), (8, 'INDEPENDENCIA', 1), (9, 'LA CISTERNA', 1), (10, 'LA FLORIDA', 1),
    (11, 'LA GRANJA', 1), (12, 'LA PINTANA', 1), (13, 'LA REINA', 1), (14, 'LAS CONDES', 1), (15, 'LO BARNECHEA', 1),
    (16, 'LO ESPEJO', 1), (17, 'LO PRADO', 1), (18, 'MACUL', 1), (19, 'MAIPÚ', 1), (20, 'ÑUÑOA', 1),
    (21, 'PEDRO AGUIRRE CERDA', 1), (22, 'PEÑALOLÉN', 1), (23, 'PROVIDENCIA', 1), (24, 'PUDAHUEL', 1), (25, 'QUILICURA', 1),
    (26, 'QUINTA NORMAL', 1), (27, 'RECOLETA', 1), (28, 'RENCA', 1), (29, 'SAN JOAQUÍN', 1), (30, 'SAN MIGUEL', 1),
    (31, 'SAN RAMÓN', 1), (32, 'VITACURA', 1), (33, 'PUENTE ALTO', 1), (34, 'PIRQUE', 1), (35, 'SAN JOSÉ DE MAIPO', 1),
    (36, 'COLINA', 1), (37, 'LAMPA', 1), (38, 'TILTIL', 1), (39, 'SAN BERNARDO', 1), (40, 'BUIN', 1),
    (41, 'CALERA DE TANGO', 1), (42, 'PAINE', 1), (43, 'MELIPILLA', 1), (44, 'ALHUÉ', 1), (45, 'CURACAVÍ', 1),
    (46, 'MARÍA PINTO', 1), (47, 'SAN PEDRO', 1), (48, 'TALAGANTE', 1), (49, 'EL MONTE', 1), (50, 'ISLA DE MAIPO', 1),
    (51, 'PADRE HURTADO', 1), (52, 'PEÑAFLOR', 1),

    -- REGIÓN DE ARICA Y PARINACOTA (region_id = 2)
    (53, 'ARICA', 2), (54, 'CAMARONES', 2), (55, 'PUTRE', 2), (56, 'GENERAL LAGOS', 2),

    -- REGIÓN DE TARAPACÁ (region_id = 3)
    (57, 'IQUIQUE', 3), (58, 'ALTO HOSPICIO', 3), (59, 'POZO ALMONTE', 3), (60, 'CAMIÑA', 3), (61, 'COLCHANE', 3),
    (62, 'HUARA', 3), (63, 'PICA', 3),

    -- REGIÓN DE ANTOFAGASTA (region_id = 4)
    (64, 'ANTOFAGASTA', 4), (65, 'CALAMA', 4), (66, 'MEJILLONES', 4), (67, 'TOCOPILLA', 4), (68, 'MARÍA ELENA', 4),
    (69, 'OLLAGÜE', 4), (70, 'SAN PEDRO DE ATACAMA', 4), (71, 'SIERRA GORDA', 4), (72, 'TALTAL', 4),

    -- REGIÓN DE ATACAMA (region_id = 5)
    (73, 'COPIAPÓ', 5), (74, 'VALLENAR', 5), (75, 'CALDERA', 5), (76, 'CHAÑARAL', 5), (77, 'DIEGO DE ALMAGRO', 5),
    (78, 'FREIRINA', 5), (79, 'HUASCO', 5), (80, 'TIERRA AMARILLA', 5), (81, 'ALTO DEL CARMEN', 5),

    -- REGIÓN DE COQUIMBO (region_id = 6)
    (82, 'LA SERENA', 6), (83, 'COQUIMBO', 6), (84, 'OVALLE', 6), (85, 'ANDACOLLO', 6), (86, 'CANELA', 6),
    (87, 'COMBARBALÁ', 6), (88, 'ILLAPEL', 6), (89, 'LA HIGUERA', 6), (90, 'LOS VILOS', 6), (91, 'MONTE PATRIA', 6),
    (92, 'PAIHUANO', 6), (93, 'PUNITAQUI', 6), (94, 'RÍO HURTADO', 6), (95, 'SALAMANCA', 6), (96, 'VICUÑA', 6),

    -- REGIÓN DE VALPARAÍSO (region_id = 7)
    (97, 'VALPARAÍSO', 7), (98, 'VIÑA DEL MAR', 7), (99, 'CONCÓN', 7), (100, 'QUILPUÉ', 7), (101, 'VILLA ALEMANA', 7),
    (102, 'QUILLOTA', 7), (103, 'CALERA', 7), (104, 'HIJUELAS', 7), (105, 'LA CRUZ', 7), (106, 'NOGALES', 7),
    (107, 'SAN ANTONIO', 7), (108, 'ALGARROBO', 7), (109, 'CARTAGENA', 7), (110, 'EL QUISCO', 7), (111, 'EL TABO', 7),
    (112, 'SANTO DOMINGO', 7), (113, 'LOS ANDES', 7), (114, 'CALLE LARGA', 7), (115, 'RINCONADA', 7), (116, 'SAN ESTEBAN', 7),
    (117, 'SAN FELIPE', 7), (118, 'CATEMU', 7), (119, 'LLAILLAY', 7), (120, 'PANQUEHUE', 7), (121, 'PUTAENDO', 7),
    (122, 'SANTA MARÍA', 7), (123, 'PETORCA', 7), (124, 'CABILDO', 7), (125, 'LA LIGUA', 7), (126, 'PAPUDO', 7),
    (127, 'ZAPALLAR', 7), (128, 'LIMACHE', 7), (129, 'OLMUÉ', 7), (130, 'ISLA DE PASCUA', 7), (131, 'JUAN FERNÁNDEZ', 7),
    (132, 'CASABLANCA', 7), (133, 'PUCHUNCAVÍ', 7), (134, 'QUINTERO', 7),

    -- REGIÓN DE O'HIGGINS (region_id = 8)
    (135, 'RANCAGUA', 8), (136, 'SAN FERNANDO', 8), (137, 'CHIMBARONGO', 8), (138, 'CODEGUA', 8), (139, 'COINCO', 8),
    (140, 'COLTAUCO', 8), (141, 'DOÑIHUE', 8), (142, 'GRANEROS', 8), (143, 'LAS CABRAS', 8), (144, 'LITUECHE', 8),
    (145, 'LOLOL', 8), (146, 'MACHALÍ', 8), (147, 'MALLOA', 8), (148, 'MARCHIGÜE', 8), (149, 'MOSTAZAL', 8),
    (150, 'NANCAGUA', 8), (151, 'NAVIDAD', 8), (152, 'OLIVAR', 8), (153, 'PALMILLA', 8), (154, 'PAREDONES', 8),
    (155, 'PERALILLO', 8), (156, 'PEUMO', 8), (157, 'PICHIDEGUA', 8), (158, 'PICHILEMU', 8), (159, 'PLACILLA', 8),
    (160, 'PUMANQUE', 8), (161, 'QUINTA DE TILCOCO', 8), (162, 'RENGO', 8), (163, 'REQUÍNOA', 8), (164, 'SAN VICENTE', 8),
    (165, 'SANTA CRUZ', 8), (166, 'LA ESTRELLA', 8), (167, 'CHEPICA', 8),

    -- REGIÓN DEL MAULE (region_id = 9)
    (168, 'TALCA', 9), (169, 'CURICÓ', 9), (170, 'LINARES', 9), (171, 'CAUQUENES', 9), (172, 'COLBÚN', 9),
    (173, 'CONSTITUCIÓN', 9), (174, 'CUREPTO', 9), (175, 'EMPEDRADO', 9), (176, 'HUALAÑÉ', 9), (177, 'LICANTÉN', 9),
    (178, 'LONGAVÍ', 9), (179, 'MAULE', 9), (180, 'MOLINA', 9), (181, 'PARRAL', 9), (182, 'PELARCO', 9),
    (183, 'PELLUHUE', 9), (184, 'PENCAHUE', 9), (185, 'RAUCO', 9), (186, 'RETIRO', 9), (187, 'RÍO CLARO', 9),
    (188, 'ROMERAL', 9), (189, 'SAGRADA FAMILIA', 9), (190, 'SAN CLEMENTE', 9), (191, 'SAN JAVIER', 9), (192, 'SAN RAFAEL', 9),
    (193, 'TENO', 9), (194, 'VICHUQUÉN', 9), (195, 'VILLA ALEGRE', 9), (196, 'YERBAS BUENAS', 9), (197, 'CHANCO', 9),

    -- REGIÓN DE ÑUBLE (region_id = 10)
    (198, 'CHILLÁN', 10), (199, 'BULNES', 10), (200, 'COBQUECURA', 10), (201, 'COELEMU', 10), (202, 'COIHUECO', 10),
    (203, 'CHILLÁN VIEJO', 10), (204, 'EL CARMEN', 10), (205, 'NINHUE', 10), (206, 'ÑIQUÉN', 10), (207, 'PEMUCO', 10),
    (208, 'PINTO', 10), (209, 'PORTEZUELO', 10), (210, 'QUILLÓN', 10), (211, 'QUIRIHUE', 10), (212, 'RÁNQUIL', 10),
    (213, 'SAN CARLOS', 10), (214, 'SAN FABIÁN', 10), (215, 'SAN IGNACIO', 10), (216, 'SAN NICOLÁS', 10), (217, 'TREHUACO', 10),
    (218, 'YUNGAY', 10),

    -- REGIÓN DEL BÍOBÍO (region_id = 11)
    (219, 'CONCEPCIÓN', 11), (220, 'TALCAHUANO', 11), (221, 'SAN PEDRO DE LA PAZ', 11), (222, 'LOS ÁNGELES', 11), (223, 'ANTUCO', 11),
    (224, 'ARAUCO', 11), (225, 'CABRERO', 11), (226, 'CAÑETE', 11), (227, 'CHIGUAYANTE', 11), (228, 'CONTULMO', 11),
    (229, 'CORONEL', 11), (230, 'CURANILAHUE', 11), (231, 'FLORIDA', 11), (232, 'HUALPÉN', 11), (233, 'HUALQUI', 11),
    (234, 'LAJA', 11), (235, 'LEBU', 11), (236, 'LOTA', 11), (237, 'MULCHÉN', 11), (238, 'NACIMIENTO', 11),
    (239, 'NEGRETE', 11), (240, 'PENCO', 11), (241, 'QUILACO', 11), (242, 'QUILLECO', 11), (243, 'SAN ROSENDO', 11),
    (244, 'SANTA BÁRBARA', 11), (245, 'SANTA JUANA', 11), (246, 'TIRÚA', 11), (247, 'TOMÉ', 11), (248, 'TUCAPEL', 11),
    (249, 'YUMBEL', 11), (250, 'ALTO BIOBÍO', 11), (251, 'HUALPÉN_EXTRA', 11),

    -- REGIÓN DE LA ARAUCANÍA (region_id = 12)
    (252, 'TEMUCO', 12), (253, 'PADRE LAS CASAS', 12), (254, 'VILLARRICA', 12), (255, 'ANGOL', 12), (256, 'CARAHUE', 12),
    (257, 'CHOLCHOL', 12), (258, 'COLLIPULLI', 12), (259, 'CURACAUTÍN', 12), (260, 'CURARREHUE', 12), (261, 'ERCILLA', 12),
    (262, 'FREIRE', 12), (263, 'GALVARINO', 12), (264, 'GORBEA', 12), (265, 'LAUTARO', 12), (266, 'LONCOCHE', 12),
    (267, 'LONQUIMAY', 12), (268, 'LOS SAUCES', 12), (269, 'LUMACO', 12), (270, 'MELIPEUCO', 12), (271, 'NUEVA IMPERIAL', 12),
    (272, 'PERQUENCO', 12), (273, 'PITRUFQUÉN', 12), (274, 'PUCÓN', 12), (275, 'PUREN', 12), (276, 'RENAICO', 12),
    (277, 'SAAVEDRA', 12), (278, 'TEODORO SCHMIDT', 12), (279, 'TOLTÉN', 12), (280, 'TRAIGUÉN', 12), (281, 'VICTORIA', 12),
    (282, 'CURACAUTÍN_EXTRA', 12), (283, 'VILCÚN', 12),

    -- REGIÓN DE LOS RÍOS (region_id = 13)
    (284, 'VALDIVIA', 13), (285, 'CORRAL', 13), (286, 'FUTRONO', 13), (287, 'LAGO RANCO', 13), (288, 'LANCO', 13),
    (289, 'LA UNIÓN', 13), (290, 'LOS LAGOS', 13), (291, 'MAFIL', 13), (292, 'MARIQUINA', 13), (293, 'PAILLACO', 13),
    (294, 'PANGUIPULLI', 13), (295, 'RÍO BUENO', 13),

    -- REGIÓN DE LOS LAGOS (region_id = 14)
    (296, 'PUERTO MONTT', 14), (297, 'OSORNO', 14), (298, 'PUERTO VARAS', 14), (299, 'CASTRO', 14), (300, 'ANCUD', 14),
    (301, 'CALBUCO', 14), (302, 'CHAITÉN', 14), (303, 'CHONCHI', 14), (304, 'COCHAMÓ', 14), (305, 'CURACO DE VÉLEZ', 14),
    (306, 'DALCAHUE', 14), (307, 'FRESIA', 14), (308, 'FRUTILLAR', 14), (309, 'FUTALEUFÚ', 14), (310, 'HUALAIHUÉ', 14),
    (311, 'LLANQUIHUE', 14), (312, 'LOS MUERMOS', 14), (313, 'MAULLÍN', 14), (314, 'PALENA', 14), (315, 'PUERTO OCTAY', 14),
    (316, 'PUQUELDÓN', 14), (317, 'PURRANQUE', 14), (318, 'PUYEHUE', 14), (319, 'QUEILÉN', 14), (320, 'QUELLÓN', 14),
    (321, 'QUEMCHI', 14), (322, 'QUINCHAO', 14), (323, 'RÍO NEGRO', 14), (324, 'SAN JUAN DE LA COSTA', 14), (325, 'SAN PABLO', 14),

    -- REGIÓN DE AYSÉN (region_id = 15)
    (326, 'COYHAIQUE', 15), (327, 'AYSÉN', 15), (328, 'CHILE CHICO', 15), (329, 'CISNES', 15), (330, 'COCHRANE', 15),
    (331, 'GUAITECAS', 15), (332, 'LAGO VERDE', 15), (333, 'O''HIGGINS_AYSER', 15), (334, 'RÍO IBÁÑEZ', 15), (335, 'TORTEL', 15),

    -- REGIÓN DE MAGALLANES Y DE LA ANTÁRTICA CHILENA (region_id = 16)
    (336, 'PUNTA ARENAS', 16), (337, 'CABO DE HORNOS', 16), (338, 'LAGUNA BLANCA', 16), (339, 'NATALES', 16), (340, 'PORVENIR', 16),
    (341, 'PRIMAVERA', 16), (342, 'RÍO VERDE', 16), (343, 'SAN GREGORIO', 16), (344, 'TIMAUKEL', 16), (345, 'TORRES DEL PAINE', 16),
    (346, 'ANTÁRTICA', 16);

INSERT INTO centros (nombre, direccion, telefono, comuna_id, activo) VALUES
('Hospital Central RedNorte', 'Av. Libertad 1200', '+56 32 2201001', 1, TRUE),
('Clínica Norte', 'Calle Los Robles 455', '+56 32 2201002', 2, TRUE),
('CESFAM San Martín', 'Av. Valparaíso 890', '+56 32 2201003', 3, TRUE),
('SAR Bellavista', 'Pasaje Las Flores 210', '+56 32 2201004', 4, TRUE),
('Hospital Provincial Quillota', 'Av. O''Higgins 1560', '+56 33 2201005', 5, TRUE),
('CESFAM Quilpue Norte', 'Camino Troncal 785', '+56 32 2201006', 6, TRUE),
('Hospital Valparaíso RedNorte', 'Av. Argentina 1430', '+56 32 2201007', 7, TRUE),
('Centro Médico Viña del Mar', 'Av. Marina 250', '+56 32 2201008', 8, TRUE),
('COSAM RedNorte', 'Av. Pedro Montt 980', '+56 32 2201009', 9, TRUE),
('SAPU Placilla', 'Ruta F-50 Km 3', '+56 32 2201010', 10, TRUE);
