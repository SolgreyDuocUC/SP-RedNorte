package cl.rednorte.ms_ficha_clinica.service;

import cl.rednorte.ms_ficha_clinica.dto.ObservationDTO;
import java.util.List;

public interface ObservationService {
    ObservationDTO createObservation(ObservationDTO observationDTO);

    ObservationDTO getObservationById(String id);

    List<ObservationDTO> getAllObservations();

    List<ObservationDTO> getObservationsByPatientId(String patientId);

    List<ObservationDTO> getObservationsByEncounterId(String encounterId);

    List<ObservationDTO> getObservationHistory(String patientId);

    ObservationDTO updateObservation(String id, ObservationDTO observationDTO);

    void deleteObservation(String id);
}
