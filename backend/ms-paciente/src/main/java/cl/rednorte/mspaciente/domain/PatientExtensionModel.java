package cl.rednorte.mspaciente.domain;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientExtensionModel {

    private String patientId;
    private boolean isForeign;
}
