package ms_paciente.domain.mapper;

import ms_paciente.domain.CoverageModel;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Coverage;
import org.hl7.fhir.r4.model.Reference;

public class CoverageMapper {

    private CoverageMapper() {}

    public static Coverage toFhir(CoverageModel model) {
        if (model == null) return null;

        Coverage coverage = new Coverage();
        if (model.getId() != null) {
            coverage.setId(model.getId());
        }

        if (model.getType() != null) {
            coverage.setType(new CodeableConcept().setText(model.getType()));
        }

        if (model.getProvider() != null) {
            coverage.addPayor().setDisplay(model.getProvider());
        }

        if (model.getPlan() != null) {
            coverage.addClass_().setName(model.getPlan());
        }

        if (model.getStatus() != null) {
            try {
                coverage.setStatus(Coverage.CoverageStatus.fromCode(model.getStatus().toLowerCase()));
            } catch (Exception e) {
                coverage.setStatus(Coverage.CoverageStatus.ACTIVE);
            }
        }

        if (model.getPatientId() != null) {
            coverage.setBeneficiary(new Reference("Patient/" + model.getPatientId()));
        }

        return coverage;
    }

    public static CoverageModel toModel(Coverage fhir) {
        if (fhir == null) return null;

        CoverageModel model = new CoverageModel();
        model.setId(fhir.getIdElement().getIdPart());

        if (fhir.hasType()) {
            model.setType(fhir.getType().getText());
        }

        if (fhir.hasPayor() && !fhir.getPayor().isEmpty()) {
            model.setProvider(fhir.getPayorFirstRep().getDisplay());
        }

        if (fhir.hasClass_() && !fhir.getClass_().isEmpty()) {
            model.setPlan(fhir.getClass_FirstRep().getName());
        }

        if (fhir.hasStatus()) {
            model.setStatus(fhir.getStatus().toCode().toUpperCase());
        }

        if (fhir.hasBeneficiary() && fhir.getBeneficiary().hasReference()) {
            String ref = fhir.getBeneficiary().getReference();
            if (ref.contains("/")) {
                model.setPatientId(ref.split("/")[1]);
            } else {
                model.setPatientId(ref);
            }
        }

        return model;
    }
}
