package cl.rednorte.ms_reservas.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import jakarta.annotation.PostConstruct;

@Configuration
public class DatabaseFixer {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void fixConstraints() {
        try {
            jdbcTemplate.execute("ALTER TABLE appointments ALTER COLUMN end_time DROP NOT NULL");
            System.out.println("[DatabaseFixer] Exito: restriccion NOT NULL eliminada de end_time en appointments.");
        } catch (Exception e) {
            System.out.println("[DatabaseFixer] Info: " + e.getMessage());
        }
        try {
            jdbcTemplate.execute("ALTER TABLE appointments ALTER COLUMN start_time DROP NOT NULL");
        } catch (Exception e) {}
        try {
            jdbcTemplate.execute("ALTER TABLE appointments ALTER COLUMN slot_id DROP NOT NULL");
        } catch (Exception e) {}
    }
}
