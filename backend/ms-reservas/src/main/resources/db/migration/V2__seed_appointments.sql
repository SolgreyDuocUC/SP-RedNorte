-- Citas médicas: 4 confirmadas contra los slots "busy" de V1, y 2 en lista
-- de espera (sin profesional ni horario asignado todavía, ver comentarios de
-- AppointmentEntity). patient_id referencia a los pacientes de ms-paciente.
INSERT INTO appointments (id, patient_id, practitioner_id, specialty, slot_id, start_time, end_time, status, description, priority, created_at, deleted) VALUES
('apt-0001', '1', '1', 'Cardiología', 'slot-0001', '2026-07-14 09:00:00', '2026-07-14 09:30:00', 'booked', 'Control de hipertensión arterial', 1, '2026-07-08 10:00:00', false),
('apt-0002', '3', '1', 'Cardiología', 'slot-0003', '2026-07-15 10:00:00', '2026-07-15 10:30:00', 'booked', 'Evaluación de arritmia', 2, '2026-07-09 15:30:00', false),
('apt-0003', '2', '2', 'Pediatría', 'slot-0004', '2026-07-14 11:00:00', '2026-07-14 11:30:00', 'booked', 'Control niño sano de 6 meses', 1, '2026-07-07 09:15:00', false),
('apt-0004', '6', '2', 'Pediatría', 'slot-0006', '2026-07-16 09:00:00', '2026-07-16 09:30:00', 'booked', 'Cuadro febril de 2 días de evolución', 2, '2026-07-10 08:45:00', false),
('apt-0005', '5', NULL, 'Dermatología', NULL, NULL, NULL, 'waitlist', 'Consulta por lesión cutánea sospechosa', 1, '2026-07-10 12:00:00', false),
('apt-0006', '8', NULL, 'Traumatología y Ortopedia', NULL, NULL, NULL, 'waitlist', 'Dolor lumbar persistente hace 3 semanas', 2, '2026-07-11 08:00:00', false)
ON CONFLICT (id) DO NOTHING;
