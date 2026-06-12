package cl.rednorte.ms_reservas.model.mapper;

import cl.rednorte.ms_reservas.dto.SlotDTO;
import cl.rednorte.ms_reservas.model.SlotEntity;
import org.hl7.fhir.r4.model.Slot;
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Coding;
import org.springframework.stereotype.Component;

@Component
public class SlotMapper {

    public SlotEntity toEntity(SlotDTO dto) {
        if (dto == null) {
            return null;
        }
        return SlotEntity.builder()
                .id(dto.getId())
                .practitionerId(dto.getPractitionerId())
                .specialty(dto.getSpecialty())
                .start(dto.getStart())
                .end(dto.getEnd())
                .status(dto.getStatus())
                .build();
    }

    public SlotDTO toDto(SlotEntity entity) {
        if (entity == null) {
            return null;
        }
        return SlotDTO.builder()
                .id(entity.getId())
                .practitionerId(entity.getPractitionerId())
                .specialty(entity.getSpecialty())
                .start(entity.getStart())
                .end(entity.getEnd())
                .status(entity.getStatus())
                .build();
    }

    public Slot toFhir(SlotEntity entity) {
        if (entity == null) {
            return null;
        }

        Slot slot = new Slot();
        slot.setId(entity.getId());

        if (entity.getStart() != null) slot.setStart(entity.getStart());
        if (entity.getEnd() != null) slot.setEnd(entity.getEnd());

        // Mapeo de estado según estándar FHIR (FREE, BUSY, RESERVED)
        if (entity.getStatus() != null) {
            try {
                slot.setStatus(Slot.SlotStatus.fromCode(entity.getStatus().toLowerCase()));
            } catch (Exception e) {
                slot.setStatus(Slot.SlotStatus.FREE);
            }
        }

        // Mapeo de Especialidad en estructura de concepto FHIR
        if (entity.getSpecialty() != null) {
            CodeableConcept specialtyCode = new CodeableConcept();
            specialtyCode.addCoding(new Coding()
                    .setSystem("http://snomed.info/sct")
                    .setDisplay(entity.getSpecialty()));
            slot.addSpecialty(specialtyCode);
        }

        // Referencia del profesional asignado a la agenda
        if (entity.getPractitionerId() != null) {
            slot.setSchedule(new Reference("Schedule/Practitioner/" + entity.getPractitionerId()));
        }

        return slot;
    }

    public SlotEntity fromFhir(Slot slot) {
        if (slot == null) {
            return null;
        }

        SlotEntity.SlotEntityBuilder builder = SlotEntity.builder();

        if (slot.hasIdElement() && slot.getIdElement().hasIdPart()) {
            builder.id(slot.getIdElement().getIdPart());
        }

        if (slot.hasStart()) builder.start(slot.getStart());
        if (slot.hasEnd()) builder.end(slot.getEnd());

        if (slot.hasStatus()) {
            builder.status(slot.getStatus().toCode());
        }

        if (slot.hasSpecialty() && !slot.getSpecialty().isEmpty()) {
            CodeableConcept code = slot.getSpecialty().get(0);
            if (code.hasCoding() && !code.getCoding().isEmpty()) {
                builder.specialty(code.getCoding().get(0).getDisplay());
            }
        }

        if (slot.hasSchedule() && slot.getSchedule().hasReference()) {
            String ref = slot.getSchedule().getReference();
            if (ref.contains("Practitioner/")) {
                builder.practitionerId(ref.substring(ref.lastIndexOf("/") + 1));
            }
        }

        return builder.build();
    }
}