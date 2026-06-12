package cl.rednorte.ms_reservas.service;

import cl.rednorte.ms_reservas.dto.AppointmentDTO;
import cl.rednorte.ms_reservas.model.SlotEntity;

import java.util.Optional;

public interface ReassignmentService {

    /**
     * Libera un bloque de agenda y, si existe un paciente compatible en la
     * lista de espera, lo reasigna automáticamente a dicho bloque.
     *
     * @param freedSlot bloque de agenda que quedó disponible tras una cancelación
     * @return la cita reasignada desde la lista de espera, si existe
     */
    Optional<AppointmentDTO> reassign(SlotEntity freedSlot);
}
