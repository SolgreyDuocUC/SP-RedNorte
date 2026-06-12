package cl.rednorte.ms_usuarios.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PractitionerDTO {
    private int practitionerId;
    private String runPractitioner;
    private boolean activePractitioner;
    private String firstNamePractitioner;
    private String secondNamePractitioner;
    private String lastNamePractitioner;
    private String genderPractitioner;
    private Timestamp birthdayPractitioner;
    private List<QualificationDTO> qualificationsPractitioner;
    private List<ContactDTO> contactPointsPractitioner;
    private List<AddressDTO> addressesPractitioner;
    private DeceasedDTO deceasedPractitioner;
}
