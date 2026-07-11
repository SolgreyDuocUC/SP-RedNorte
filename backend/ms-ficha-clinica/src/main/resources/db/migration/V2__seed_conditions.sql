-- Diagnósticos (CIE-10) asociados a los encuentros de V1.
-- OJO: clinical_status NO tiene @Enumerated(STRING) en la entidad, así que
-- Hibernate lo mapea por ORDINAL: ACTIVE=0, RESOLVED=1, INACTIVE=2.
INSERT INTO conditions (id, patient_id, encounter_id, code, clinical_status, description, onset_date, recorded_date) VALUES
('cond-0001', '1', 'enc-0001', 'I10', 0, 'Hipertensión arterial esencial', '2025-01-15', '2026-06-10 09:20:00'),
('cond-0002', '3', 'enc-0002', 'I47.1', 0, 'Taquicardia supraventricular paroxística', '2026-05-20', '2026-05-22 10:30:00'),
('cond-0003', '2', 'enc-0003', 'Z00.1', 1, 'Control de salud de niño sano', '2026-04-14', '2026-04-14 11:15:00'),
('cond-0004', '6', 'enc-0004', 'J06.9', 1, 'Infección aguda de vías respiratorias superiores', '2026-02-28', '2026-03-02 09:15:00')
ON CONFLICT (id) DO NOTHING;
