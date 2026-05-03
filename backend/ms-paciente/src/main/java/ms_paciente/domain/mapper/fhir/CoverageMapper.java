package ms_paciente.domain.mapper.fhir;

import ms_paciente.domain.CoverageModel;
import org.hl7.fhir.r4.model.Coverage;
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.CodeableConcept;

public class CoverageMapper {

    public static Coverage toFhir(CoverageModel model) {
        if (model == null) return null;

        Coverage coverage = new Coverage();
        
        if (model.getId() != null) {
            coverage.setId(model.getId());
        }

        // Mapping type
        if (model.getType() != null) {
            coverage.setType(new CodeableConcept().setText(model.getType()));
        }

        // Mapping provider (payor)
        if (model.getProvider() != null) {
            coverage.addPayor().setDisplay(model.getProvider());
        }

        // Mapping plan (class)
        if (model.getPlan() != null) {
            Coverage.ClassComponent classComponent = coverage.addClass_();
            classComponent.setName(model.getPlan());

            classComponent.getType()
                    .addCoding()
                    .setCode("plan")
                    .setSystem("http://terminology.hl7.org/CodeSystem/coverage-class");
        }

        // Mapping status
        if (model.getStatus() != null) {
            try {
                coverage.setStatus(Coverage.CoverageStatus.fromCode(model.getStatus().toLowerCase()));
            } catch (Exception e) {
                // Defaulting or handling invalid status
                if ("ACTIVE".equalsIgnoreCase(model.getStatus())) {
                    coverage.setStatus(Coverage.CoverageStatus.ACTIVE);
                } else {
                    coverage.setStatus(Coverage.CoverageStatus.CANCELLED);
                }
            }
        }

        // Mapping patientId -> beneficiary
        if (model.getPatientId() != null) {
            coverage.setBeneficiary(new Reference("Patient/" + model.getPatientId()));
        }

        return coverage;
    }

    public static CoverageModel toModel(Coverage fhir) {
        if (fhir == null) return null;

        CoverageModel model = new CoverageModel();
        
        model.setId(fhir.getIdElement().getIdPart());

        // type.text -> type
        if (fhir.hasType() && fhir.getType().hasText()) {
            model.setType(fhir.getType().getText());
        }

        // payor.display -> provider
        if (fhir.hasPayor() && !fhir.getPayor().isEmpty()) {
            model.setProvider(fhir.getPayor().get(0).getDisplay());
        }

        // class.name -> plan
        if (fhir.hasClass_() && !fhir.getClass_().isEmpty()) {
            model.setPlan(fhir.getClass_().get(0).getName());
        }

        // status -> status
        if (fhir.hasStatus()) {
            model.setStatus(fhir.getStatus().toCode().toUpperCase());
        }

        // beneficiary.reference -> patientId
        if (fhir.hasBeneficiary() && fhir.getBeneficiary().hasReference()) {
            String ref = fhir.getBeneficiary().getReference();
            if (ref.startsWith("Patient/")) {
                model.setPatientId(ref.substring(8));
            } else {
                model.setPatientId(ref);
            }
        }

        return model;
    }
}
