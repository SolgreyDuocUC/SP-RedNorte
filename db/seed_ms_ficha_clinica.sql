-- Seed Data for MS-FICHA-CLINICA
-- Este script inserta datos de prueba iniciales para validar la funcionalidad del microservicio.
-- Alineado con las entidades JPA reales: EncounterEntity, ObservationEntity, ConditionEntity,
-- ProcedureEntity y ClinicalNoteEntity (cl.rednorte.ms_ficha_clinica.model).

-- 0. Limpieza previa de las tablas propias de MS-FICHA-CLINICA
-- (permite re-ejecutar el script sin choques de clave primaria, ya que los id son strings fijos)
TRUNCATE TABLE clinical_notes, procedures, conditions, observations, encounters CASCADE;

-- 1. Insertar Encuentros (Encounters)
INSERT INTO encounters (id, patient_id, location_id, status, period_start, period_end, practitioner) VALUES
('enc-001', 'pat-2024-001', 'loc-central', 'FINISHED', '2024-05-01 10:00:00', '2024-05-01 10:30:00', 'Dr. Arnaldo Casas'),
('enc-002', 'pat-2024-002', 'loc-norte', 'IN_PROGRESS', '2024-05-09 15:30:00', NULL, 'Dra. Elena Rivas');

-- 2. Insertar Observaciones (Observations) - Signos Vitales
INSERT INTO observations (id, patient_id, encounter_id, code, value, unit, effective_date) VALUES
('obs-001', 'pat-2024-001', 'enc-001', '8480-6', 120.0, 'mmHg', '2024-05-01 10:05:00'),
('obs-002', 'pat-2024-001', 'enc-001', '8462-4', 80.0, 'mmHg', '2024-05-01 10:05:00'),
('obs-003', 'pat-2024-002', 'enc-002', '8310-5', 36.8, 'Cel', '2024-05-09 15:35:00');

-- 3. Insertar Condiciones (Conditions) - Diagnósticos
-- clinical_status se persiste como ORDINAL (entero) porque ConditionEntity.clinicalStatus
-- no usa @Enumerated(EnumType.STRING). Valores de ClinicalStatus: 0=ACTIVE, 1=RESOLVED, 2=INACTIVE
INSERT INTO conditions (id, patient_id, encounter_id, code, clinical_status, description, onset_date, recorded_date) VALUES
('cond-001', 'pat-2024-001', 'enc-001', 'I10', 0, 'Hipertensión esencial (primaria)', '2024-04-20 00:00:00', '2024-05-01 10:15:00'),
('cond-002', 'pat-2024-002', 'enc-002', 'J00', 0, 'Rinofaringitis aguda (resfriado común)', '2024-05-07 00:00:00', '2024-05-09 15:40:00');

-- 4. Insertar Procedimientos (Procedures)
INSERT INTO procedures (id, patient_id, encounter_id, code, status, performed_date, description) VALUES
('proc-001', 'pat-2024-001', 'enc-001', '93.11', 'completed', '2024-05-01 11:00:00', 'Fisioterapia de tórax');

-- 5. Insertar Notas Clínicas (Clinical Notes)
INSERT INTO clinical_notes (id, patient_id, encounter_id, content, author, created_at) VALUES
('note-001', 'pat-2024-001', 'enc-001', 'Paciente estable, se indica control de presión arterial en domicilio.', 'Dr. Arnaldo Casas', '2024-05-01 11:30:00'),
('note-002', 'pat-2024-002', 'enc-002', 'Consulta inicial por síntomas respiratorios leves.', 'Dra. Elena Rivas', '2024-05-09 15:50:00');

-- Verificación
SELECT * FROM encounters;
SELECT * FROM observations;
SELECT * FROM conditions;
SELECT * FROM procedures;
SELECT * FROM clinical_notes;
