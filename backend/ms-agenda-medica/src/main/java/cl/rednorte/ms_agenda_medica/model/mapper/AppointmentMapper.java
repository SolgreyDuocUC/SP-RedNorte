package cl.rednorte.ms_agenda_medica.model.mapper;

import cl.rednorte.ms_agenda_medica.dto.AppointmentDTO;
import cl.rednorte.ms_agenda_medica.model.AppointmentEntity;

import org.hl7.fhir.r4.model.Appointment;
import org.hl7.fhir.r4.model.Reference;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.Collectors;

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
                .start(dto.getStart())
                .end(dto.getEnd())
                .status(dto.getStatus())
                .description(dto.getDescription())
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
                .start(entity.getStart())
                .end(entity.getEnd())
                .status(entity.getStatus())
                .description(entity.getDescription())
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

        // Basic status mapping logic
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

        return builder.build();
    }
}
