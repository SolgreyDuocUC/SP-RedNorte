package cl.rednorte.ms_usuarios.config;

import cl.rednorte.ms_usuarios.model.RoleEntity;
import cl.rednorte.ms_usuarios.model.UserEntity;
import cl.rednorte.ms_usuarios.repository.RoleRepository;
import cl.rednorte.ms_usuarios.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * Seed de roles y usuarios demo (perfil dev), uno por rol, para poder
 * probar el login real y cada dashboard. Idempotente: solo crea lo que
 * falta, nunca modifica ni borra registros existentes.
 */
@Slf4j
@Profile("dev")
@Component
@RequiredArgsConstructor
public class DevDataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private record DemoUser(String username, String password, String email, String role) {}

    private static final List<DemoUser> DEMO_USERS = List.of(
            new DemoUser("12345678-5", "admin123", "admin@rednorte.cl", "admin"),
            new DemoUser("11111111-1", "administrativo123", "administrativo@rednorte.cl", "administrativo"),
            new DemoUser("22222222-2", "enfermeria123", "enfermeria@rednorte.cl", "enfermeria"),
            new DemoUser("33333333-3", "medico123", "medico@rednorte.cl", "medico"),
            new DemoUser("44444444-4", "paciente123", "paciente@rednorte.cl", "paciente")
    );

    @Override
    @Transactional
    public void run(String... args) {
        DEMO_USERS.stream()
                .map(DemoUser::role)
                .distinct()
                .forEach(this::ensureRole);

        DEMO_USERS.forEach(this::ensureUser);
    }

    private void ensureRole(String name) {
        if (!roleRepository.existsByName(name)) {
            roleRepository.save(RoleEntity.builder().name(name).build());
            log.info("DevDataInitializer: rol creado '{}'", name);
        }
    }

    private void ensureUser(DemoUser demo) {
        if (userRepository.existsByUsername(demo.username())) {
            return;
        }

        RoleEntity role = roleRepository.findByName(demo.role())
                .orElseThrow(() -> new IllegalStateException("Rol no encontrado: " + demo.role()));

        UserEntity user = UserEntity.builder()
                .username(demo.username())
                .password(passwordEncoder.encode(demo.password()))
                .email(demo.email())
                .enabled(true)
                .roles(Set.of(role))
                .build();

        userRepository.save(user);
        log.info("DevDataInitializer: usuario demo creado '{}' (rol: {})", demo.username(), demo.role());
    }
}
