-- Poblado de especialidades médicas ofrecidas por la red de centros.
INSERT INTO especialidades (id_especialidad, nombre_especialidad, descripcion_especialidad) VALUES
(1, 'Medicina General', 'Atención primaria, control de salud y derivación a especialidades.'),
(2, 'Pediatría', 'Atención médica integral de niños, niñas y adolescentes.'),
(3, 'Ginecología y Obstetricia', 'Salud reproductiva de la mujer, control prenatal y parto.'),
(4, 'Cardiología', 'Diagnóstico y tratamiento de enfermedades del corazón y sistema circulatorio.'),
(5, 'Traumatología y Ortopedia', 'Tratamiento de lesiones y enfermedades del sistema músculo-esquelético.'),
(6, 'Psiquiatría', 'Diagnóstico y tratamiento de trastornos de salud mental.'),
(7, 'Oftalmología', 'Diagnóstico y tratamiento de enfermedades y trastornos visuales.'),
(8, 'Dermatología', 'Diagnóstico y tratamiento de enfermedades de la piel.'),
(9, 'Medicina Interna', 'Diagnóstico y manejo integral de enfermedades del adulto.'),
(10, 'Cirugía General', 'Procedimientos quirúrgicos de abdomen, piel y tejidos blandos.')
ON CONFLICT (id_especialidad) DO NOTHING;

SELECT setval(pg_get_serial_sequence('especialidades', 'id_especialidad'), COALESCE((SELECT MAX(id_especialidad) FROM especialidades), 1));
