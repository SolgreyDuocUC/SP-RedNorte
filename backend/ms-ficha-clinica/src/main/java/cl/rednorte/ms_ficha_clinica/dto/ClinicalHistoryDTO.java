package cl.rednorte.ms_ficha_clinica.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClinicalHistoryDTO {
    private String patientId;
    private List<EncounterDTO> encounters;
    private List<ObservationDTO> observations;
    private List<ConditionDTO> conditions;
    private List<ProcedureDTO> procedures;
    private List<ClinicalNoteDTO> clinicalNotes;
}
