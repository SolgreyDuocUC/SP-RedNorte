-- Procedimientos realizados durante los encuentros de V1.
INSERT INTO procedures (id, patient_id, encounter_id, code, status, performed_date, description) VALUES
('proc-0001', '1', 'enc-0001', 'ECG-001', 'completed', '2026-06-10 09:25:00', 'Electrocardiograma de 12 derivaciones'),
('proc-0002', '3', 'enc-0002', 'ECG-001', 'completed', '2026-05-22 10:20:00', 'Electrocardiograma de 12 derivaciones')
ON CONFLICT (id) DO NOTHING;
