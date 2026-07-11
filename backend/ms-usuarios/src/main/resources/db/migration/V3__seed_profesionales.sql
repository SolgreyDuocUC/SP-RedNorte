-- Profesionales (registro clínico tipo FHIR Practitioner) de los dos
-- usuarios ROLE_MEDICO sembrados en V2 (mismo RUN). centro_id/especialidad_id
-- referencian los IDs sembrados por ms-centros (V4/V3 de ese servicio); no hay
-- FK física entre microservicios, solo consistencia lógica de datos.
INSERT INTO profesionales (id_profesional, run_profesional, activo, primer_nombre, segundo_nombre, apellidos, genero, fecha_nacimiento) VALUES
(1, '8888888-K', true, 'Matías', 'Andrés', 'Fernández Cortés', 'M', '1985-04-12'),
(2, '7777777-6', true, 'Daniela', 'Paz', 'Soto Herrera', 'F', '1990-09-23')
ON CONFLICT (id_profesional) DO NOTHING;

SELECT setval(pg_get_serial_sequence('profesionales', 'id_profesional'), COALESCE((SELECT MAX(id_profesional) FROM profesionales), 1));

-- Centro donde atiende cada profesional (id_centro de ms-centros)
INSERT INTO practitioner_centros (practitioner_id, centro_id) VALUES
(1, 1), -- Matías -> Hospital Regional de Antofagasta
(2, 5)  -- Daniela -> Hospital Regional de Iquique
ON CONFLICT DO NOTHING;

-- Especialidad de cada profesional (id_especialidad de ms-centros)
INSERT INTO practitioner_especialidades (practitioner_id, especialidad_id) VALUES
(1, 4), -- Matías -> Cardiología
(2, 2)  -- Daniela -> Pediatría
ON CONFLICT DO NOTHING;

INSERT INTO addresses (address_id, use_address, line_address, city_address, district_address, state_address, country_address, practitioner_id) VALUES
(1, 'work', 'Av. Argentina 1962', 'Antofagasta', 'Antofagasta', 'Región de Antofagasta', 'Chile', 1),
(2, 'work', 'Av. Héroes de la Concepción 502', 'Iquique', 'Iquique', 'Región de Tarapacá', 'Chile', 2)
ON CONFLICT (address_id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('addresses', 'address_id'), COALESCE((SELECT MAX(address_id) FROM addresses), 1));

INSERT INTO contact_points (contact_point_id, system_contact, value_contact, practitioner_id) VALUES
(1, 'phone', '+56552652000', 1),
(2, 'email', 'm.fernandez@rednorte.cl', 1),
(3, 'phone', '+56572395000', 2),
(4, 'email', 'd.soto@rednorte.cl', 2)
ON CONFLICT (contact_point_id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('contact_points', 'contact_point_id'), COALESCE((SELECT MAX(contact_point_id) FROM contact_points), 1));

INSERT INTO qualifications (qualification_id, qualification_code, qualification_period, practitioner_id) VALUES
(1, 'MED-CARDIO-001', '2012-03-01 00:00:00', 1),
(2, 'MED-PEDIA-002', '2016-03-01 00:00:00', 2)
ON CONFLICT (qualification_id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('qualifications', 'qualification_id'), COALESCE((SELECT MAX(qualification_id) FROM qualifications), 1));
