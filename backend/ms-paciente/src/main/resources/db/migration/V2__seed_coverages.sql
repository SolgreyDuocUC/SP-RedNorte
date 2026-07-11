-- Previsión de salud (FONASA/ISAPRE) de cada paciente sembrado en V1.
INSERT INTO coverages (id, patient_id, type, provider, policy_number) VALUES
('cov-1', '1', 'FONASA', 'FONASA', 'FON-000001'),
('cov-2', '2', 'ISAPRE', 'Banmédica', 'BME-100002'),
('cov-3', '3', 'FONASA', 'FONASA', 'FON-000003'),
('cov-4', '4', 'ISAPRE', 'Consalud', 'CSU-100004'),
('cov-5', '5', 'FONASA', 'FONASA', 'FON-000005'),
('cov-6', '6', 'ISAPRE', 'Cruz Blanca', 'CBL-100006'),
('cov-7', '7', 'FONASA', 'FONASA', 'FON-000007'),
('cov-8', '8', 'ISAPRE', 'Colmena Golden Cross', 'CGC-100008')
ON CONFLICT (id) DO NOTHING;
