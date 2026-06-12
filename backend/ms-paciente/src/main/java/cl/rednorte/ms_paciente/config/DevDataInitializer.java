package cl.rednorte.ms_paciente.config;

import cl.rednorte.ms_paciente.model.PatientEntity;
import cl.rednorte.ms_paciente.model.status.Gender;
import cl.rednorte.ms_paciente.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Seed mínimo para smoke E2E con H2 en memoria. Solo corre con perfil
 * {@code dev-h2}; no toca la BD de MySQL.
 */
@Slf4j
@Profile("dev-h2")
@Component
@RequiredArgsConstructor
public class DevDataInitializer implements CommandLineRunner {

    private final PatientRepository patientRepository;

    @Override
    public void run(String... args) {
        if (patientRepository.count() > 0) {
            return;
        }
        PatientEntity demo = PatientEntity.builder()
                .id("1")
                .identifierType("RUN")
                .identifierValue("12345678-9")
                .firstName("Juan")
                .lastName("Pérez")
                .gender(Gender.MALE)
                .phone("+56912345678")
                .email("juan.perez@example.cl")
                .address("Av. Principal 123, Antofagasta, CL")
                .active(true)
                .build();
        patientRepository.save(demo);
        log.info("Seed: paciente demo creado (id={}, run={}).", demo.getId(), demo.getIdentifierValue());
    }
}
