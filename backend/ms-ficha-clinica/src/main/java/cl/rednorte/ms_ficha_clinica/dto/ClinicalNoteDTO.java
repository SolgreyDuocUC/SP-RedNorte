package cl.rednorte.ms_ficha_clinica.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClinicalNoteDTO {
    private String id;
    private String patientId;
    private String encounterId;
    private String content;
    private String author;
    private Date createdAt;
}
