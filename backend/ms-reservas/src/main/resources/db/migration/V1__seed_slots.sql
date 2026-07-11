-- Bloques de agenda de los profesionales sembrados en ms-usuarios
-- (practitioner_id 1 = Matías Fernández/Cardiología, 2 = Daniela Soto/Pediatría).
-- La entidad tiene @SoftDelete: se marca "deleted=false" explícito en vez de
-- confiar en el default de columna, ya que Hibernate filtra por esa columna.
INSERT INTO slots (id, practitioner_id, specialty, start_time, end_time, status, deleted) VALUES
('slot-0001', '1', 'Cardiología', '2026-07-14 09:00:00', '2026-07-14 09:30:00', 'busy', false),
('slot-0002', '1', 'Cardiología', '2026-07-14 09:30:00', '2026-07-14 10:00:00', 'free', false),
('slot-0003', '1', 'Cardiología', '2026-07-15 10:00:00', '2026-07-15 10:30:00', 'busy', false),
('slot-0004', '2', 'Pediatría', '2026-07-14 11:00:00', '2026-07-14 11:30:00', 'busy', false),
('slot-0005', '2', 'Pediatría', '2026-07-14 11:30:00', '2026-07-14 12:00:00', 'free', false),
('slot-0006', '2', 'Pediatría', '2026-07-16 09:00:00', '2026-07-16 09:30:00', 'busy', false)
ON CONFLICT (id) DO NOTHING;
