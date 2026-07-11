-- Observaciones clínicas (signos vitales, códigos LOINC) de los encuentros de V1.
INSERT INTO observations (id, patient_id, encounter_id, code, value, unit, effective_date) VALUES
('obs-0001', '1', 'enc-0001', '8480-6', 145.0, 'mmHg', '2026-06-10 09:10:00'),
('obs-0002', '1', 'enc-0001', '8462-4', 92.0, 'mmHg', '2026-06-10 09:10:00'),
('obs-0003', '3', 'enc-0002', '8867-4', 138.0, 'lpm', '2026-05-22 10:10:00'),
('obs-0004', '2', 'enc-0003', '29463-7', 7.8, 'kg', '2026-04-14 11:05:00'),
('obs-0005', '2', 'enc-0003', '8302-2', 68.0, 'cm', '2026-04-14 11:05:00'),
('obs-0006', '6', 'enc-0004', '8310-5', 38.6, 'Cel', '2026-03-02 09:05:00')
ON CONFLICT (id) DO NOTHING;
