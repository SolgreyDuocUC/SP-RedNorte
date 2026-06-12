package cl.rednorte.ms_reservas.model.mapper;

import cl.rednorte.ms_reservas.dto.AppointmentDTO;
import cl.rednorte.ms_reservas.model.AppointmentEntity;
import cl.rednorte.ms_reservas.model.SlotEntity;
import org.hl7.fhir.r4.model.Appointment;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Coding;
import org.hl7.fhir.r4.model.Reference;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    public AppointmentEntity toEntity(AppointmentDTO dto) {
        if (dto == null) {
            return null;
        }

        return AppointmentEntity.builder()
                .id(dto.getId())
                .patientId(dto.getPatientId())
                .practitionerId(dto.getPractitionerId())
                .specialty(dto.getSpecialty()) // Nuevo campo
                .start(dto.getStart())
                .end(dto.getEnd())
                .status(dto.getStatus())
                .description(dto.getDescription())
                .priority(dto.getPriority()) // Nuevo campo
                .slot(dto.getSlotId() != null ? SlotEntity.builder().id(dto.getSlotId()).build() : null) // Relación lógica inicial
                .build();
    }

    public AppointmentDTO toDto(AppointmentEntity entity) {
        if (entity == null) {
            return null;
        }

        return AppointmentDTO.builder()
                .id(entity.getId())
                .patientId(entity.getPatientId())
                .practitionerId(entity.getPractitionerId())
                .specialty(entity.getSpecialty()) // Nuevo campo
                .start(entity.getStart())
                .end(entity.getEnd())
                .status(entity.getStatus())
                .description(entity.getDescription())
                .priority(entity.getPriority()) // Nuevo campo
                .slotId(entity.getSlot() != null ? entity.getSlot().getId() : null) // Extrae el ID del slot relacional
                .build();
    }

    public Appointment toFhir(AppointmentEntity entity) {
        if (entity == null) {
            return null;
        }

        Appointment appointment = new Appointment();
        appointment.setId(entity.getId());

        if (entity.getStart() != null)
            appointment.setStart(entity.getStart());
        if (entity.getEnd() != null)
            appointment.setEnd(entity.getEnd());

        if (entity.getDescription() != null)
            appointment.setDescription(entity.getDescription());

        // Mapeo nativo a enumeración FHIR (soporta WAITLIST, BOOKED, CANCELLED)
        if (entity.getStatus() != null) {
            try {
                appointment.setStatus(Appointment.AppointmentStatus.fromCode(entity.getStatus().toLowerCase()));
            } catch (Exception e) {
                appointment.setStatus(Appointment.AppointmentStatus.PROPOSED);
            }
        }

        // Add Patient Reference
        if (entity.getPatientId() != null) {
            Appointment.AppointmentParticipantComponent patientParticipant = new Appointment.AppointmentParticipantComponent();
            patientParticipant.setActor(new Reference("Patient/" + entity.getPatientId()));
            appointment.addParticipant(patientParticipant);
        }

        // Add Practitioner Reference
        if (entity.getPractitionerId() != null) {
            Appointment.AppointmentParticipantComponent practitionerParticipant = new Appointment.AppointmentParticipantComponent();
            practitionerParticipant.setActor(new Reference("Practitioner/" + entity.getPractitionerId()));
            appointment.addParticipant(practitionerParticipant);
        }

        // Extensión FHIR: Vincular la referencia al Slot de agenda si existe
        if (entity.getSlot() != null) {
            appointment.addSlot(new Reference("Slot/" + entity.getSlot().getId()));
        }

        // Prioridad para el algoritmo de reasignación (1 = Normal, 2 = Urgente, 3 = Crítico)
        if (entity.getPriority() != null) {
            appointment.setPriority(entity.getPriority());
        }

        // Especialidad: clave para emparejar con la lista de espera
        if (entity.getSpecialty() != null) {
            CodeableConcept specialtyCode = new CodeableConcept();
            specialtyCode.addCoding(new Coding()
                    .setSystem("http://snomed.info/sct")
                    .setDisplay(entity.getSpecialty()));
            appointment.addServiceType(specialtyCode);
        }

        return appointment;
    }

    public AppointmentEntity fromFhir(Appointment appointment) {
        if (appointment == null) {
            return null;
        }

        AppointmentEntity.AppointmentEntityBuilder builder = AppointmentEntity.builder();

        if (appointment.hasIdElement() && appointment.getIdElement().hasIdPart()) {
            builder.id(appointment.getIdElement().getIdPart());
        }

        if (appointment.hasStart())
            builder.start(appointment.getStart());
        if (appointment.hasEnd())
            builder.end(appointment.getEnd());
        if (appointment.hasDescription())
            builder.description(appointment.getDescription());

        if (appointment.hasStatus()) {
            builder.status(appointment.getStatus().toCode());
        }

        if (appointment.hasParticipant()) {
            for (Appointment.AppointmentParticipantComponent participant : appointment.getParticipant()) {
                if (participant.hasActor() && participant.getActor().hasReference()) {
                    String ref = participant.getActor().getReference();
                    if (ref.startsWith("Patient/")) {
                        builder.patientId(ref.replace("Patient/", ""));
                    } else if (ref.startsWith("Practitioner/")) {
                        builder.practitionerId(ref.replace("Practitioner/", ""));
                    }
                }
            }
        }

        // Recuperar la referencia del Slot desde el recurso FHIR
        if (appointment.hasSlot() && !appointment.getSlot().isEmpty()) {
            String slotRef = appointment.getSlot().get(0).getReference();
            if (slotRef.startsWith("Slot/")) {
                builder.slot(SlotEntity.builder().id(slotRef.replace("Slot/", "")).build());
            }
        }

        if (appointment.hasPriority()) {
            builder.priority(appointment.getPriority());
        }

        if (appointment.hasServiceType() && !appointment.getServiceType().isEmpty()) {
            CodeableConcept code = appointment.getServiceType().get(0);
            if (code.hasCoding() && !code.getCoding().isEmpty()) {
                builder.specialty(code.getCoding().get(0).getDisplay());
            }
        }

        return builder.build();
    }
}