package cl.rednorte.ms_ficha_clinica.model;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClinicalNoteModel {

    private String id;
    private String patientId;
    private String encounterId;
    private String content;
    private String author;
    private Date createdAt;
}
