package ms_paciente.model.mapper;

import ms_paciente.model.CoverageModel;
import org.hl7.fhir.r4.model.Coverage;
import org.hl7.fhir.r4.model.Reference;

public class CoverageMapper {

    private CoverageMapper() {
        // Utility class
    }

    // =========================
    // Model → FHIR
    // =========================
    public static Coverage toFhir(CoverageModel model) {

        if (model == null) return null;

        Coverage coverage = new Coverage();

        // ID
        coverage.setId(model.getId());

        // Tipo (health insurance / agreement)
        if (model.getType() != null) {
            coverage.setType(
                    new org.hl7.fhir.r4.model.CodeableConcept()
                            .setText(model.getType())
            );
        }

        // Proveedor
        if (model.getProvider() != null) {
            coverage.setPayor(
                    java.util.List.of(
                            new Reference().setDisplay(model.getProvider())
                    )
            );
        }

        // Plan
        if (model.getPlan() != null) {
            coverage.setClass_(
                    java.util.List.of(
                            new Coverage.ClassComponent()
                                    .setName(model.getPlan())
                    )
            );
        }

        // Estado
        if (model.getStatus() != null) {
            try {
                coverage.setStatus(
                        Coverage.CoverageStatus.fromCode(model.getStatus().toLowerCase())
                );
            } catch (Exception e) {
                coverage.setStatus(Coverage.CoverageStatus.ACTIVE);
            }
        }

        // Referencia a paciente
        if (model.getPatientId() != null) {
            coverage.setBeneficiary(
                    new Reference("Patient/" + model.getPatientId())
            );
        }

        return coverage;
    }

    // =========================
    // FHIR → Model
    // =========================
    public static CoverageModel toModel(Coverage coverage) {

        if (coverage == null) return null;

        CoverageModel model = new CoverageModel();

        // ID
        model.setId(coverage.getId());

        // Tipo
        if (coverage.hasType()) {
            model.setType(coverage.getType().getText());
        }

        // Proveedor
        if (coverage.hasPayor() && !coverage.getPayor().isEmpty()) {
            model.setProvider(coverage.getPayorFirstRep().getDisplay());
        }

        // Plan
        if (coverage.hasClass_() && !coverage.getClass_().isEmpty()) {
            model.setPlan(coverage.getClass_FirstRep().getName());
        }

        // Estado
        if (coverage.hasStatus()) {
            model.setStatus(coverage.getStatus().toCode().toUpperCase());
        }

        // Paciente
        if (coverage.hasBeneficiary() && coverage.getBeneficiary().hasReference()) {
            String ref = coverage.getBeneficiary().getReference(); // Patient/{id}
            if (ref != null && ref.contains("/")) {
                model.setPatientId(ref.split("/")[1]);
            }
        }

        return model;
    }
}
