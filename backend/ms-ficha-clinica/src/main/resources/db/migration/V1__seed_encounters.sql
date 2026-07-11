-- Encuentros clínicos (visitas ya ocurridas) de pacientes de ms-paciente,
-- atendidos por los profesionales sembrados en ms-usuarios (campo
-- "practitioner" guarda el RUN) en centros de ms-centros (location_id).
-- status usa @Enumerated(STRING): ARRIVED | IN_PROGRESS | FINISHED | CANCELLED.
INSERT INTO encounters (id, patient_id, location_id, status, period_start, period_end, practitioner) VALUES
('enc-0001', '1', '1', 'FINISHED', '2026-06-10 09:00:00', '2026-06-10 09:30:00', '8888888-K'),
('enc-0002', '3', '1', 'FINISHED', '2026-05-22 10:00:00', '2026-05-22 10:45:00', '8888888-K'),
('enc-0003', '2', '5', 'FINISHED', '2026-04-14 11:00:00', '2026-04-14 11:20:00', '7777777-6'),
('enc-0004', '6', '5', 'FINISHED', '2026-03-02 09:00:00', '2026-03-02 09:20:00', '7777777-6')
ON CONFLICT (id) DO NOTHING;
