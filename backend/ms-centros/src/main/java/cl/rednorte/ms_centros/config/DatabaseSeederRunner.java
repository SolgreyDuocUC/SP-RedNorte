package cl.rednorte.ms_centros.config;

import cl.rednorte.ms_centros.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.FileSystemResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.io.File;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.Statement;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeederRunner implements CommandLineRunner {

    private final DataSource dataSource;
    private final RegionRepository regionRepository;

    @Value("${app.db.auto-seed:true}")
    private boolean autoSeed;

    @Value("${app.db.seed-path:C:/Users/GAMER/Desktop/PROYECTOS WEB/SP-RedNorte/db/poblado_centros.sql}")
    private String customSeedPath;

    @Override
    public void run(String... args) throws Exception {
        if (!autoSeed) {
            log.info("Auto-seed para ms-centros está desactivado (app.db.auto-seed=false)");
            return;
        }

        // Verificar si la tabla de regiones ya tiene datos para evitar duplicados
        if (regionRepository.count() > 0) {
            log.info("La base de datos de ms-centros ya cuenta con regiones cargadas. Saltando poblado.");
            return;
        }

        log.info("Tabla regiones vacía. Iniciando ejecución automática de poblado_centros.sql...");
        executeSeedScript(false);
    }

    /**
     * Ejecuta el script SQL de poblado desde el sistema de archivos local y maneja secuencias para PostgreSQL.
     * @param force Si es true, ejecuta el script aunque ya existan datos.
     * @return Mensaje con el resultado de la operación.
     */
    public String executeSeedScript(boolean force) {
        if (!force && regionRepository.count() > 0) {
            return "El poblado de centros y regiones ya estaba cargado previamente en la base de datos.";
        }

        File scriptFile = findScriptFile();

        if (scriptFile != null && scriptFile.exists()) {
            log.info("Ejecutando script de centros desde: {}", scriptFile.getAbsolutePath());
            try (Connection conn = dataSource.getConnection()) {
                ScriptUtils.executeSqlScript(conn, new FileSystemResource(scriptFile));
                log.info("¡Script poblado_centros.sql ejecutado exitosamente!");

                // Manejo especial de secuencias si la base de datos es PostgreSQL (Neondb de producción)
                DatabaseMetaData metaData = conn.getMetaData();
                String databaseName = metaData.getDatabaseProductName();
                if (databaseName != null && databaseName.toLowerCase().contains("postgresql")) {
                    log.info("Base de datos de producción PostgreSQL detectada. Reiniciando secuencias...");
                    try (Statement stmt = conn.createStatement()) {
                        stmt.execute("SELECT setval('comunas_id_seq', COALESCE((SELECT MAX(id) FROM comunas), 1))");
                        stmt.execute("SELECT setval('regiones_id_seq', COALESCE((SELECT MAX(id) FROM regiones), 1))");
                        stmt.execute("SELECT setval('centros_id_seq', COALESCE((SELECT MAX(id) FROM centros), 1))");
                        log.info("¡Secuencias de PostgreSQL reiniciadas con éxito!");
                    }
                }
                
                return "Poblado de centros ejecutado con éxito desde: " + scriptFile.getAbsolutePath();
            } catch (Exception e) {
                log.error("Error ejecutando poblado_centros.sql: {}", e.getMessage(), e);
                return "Error al ejecutar poblado_centros.sql: " + e.getMessage();
            }
        } else {
            String msg = "No se encontró el archivo poblado_centros.sql en las rutas verificadas (" + customSeedPath + ", ../../db/poblado_centros.sql, etc.)";
            log.warn(msg);
            return msg;
        }
    }

    private File findScriptFile() {
        List<String> possiblePaths = List.of(
            customSeedPath,
            "../../db/poblado_centros.sql",
            "../db/poblado_centros.sql",
            "db/poblado_centros.sql",
            "./db/poblado_centros.sql",
            "/app/db/poblado_centros.sql",
            "/docker-entrypoint-initdb.d/02_poblado_centros.sql"
        );

        for (String path : possiblePaths) {
            File f = new File(path);
            if (f.exists() && f.isFile()) {
                return f;
            }
        }
        return null;
    }
}
