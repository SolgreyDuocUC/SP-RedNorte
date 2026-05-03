package ms_paciente.model.mapper;

import ms_paciente.model.types.IdentifierType;

public class IdentifierTypeMapper {

    private IdentifierTypeMapper() {
        // Utility class
    }

    public static IdentifierType fromString(String type) {
        if (type == null || type.isBlank()) {
            throw new IllegalArgumentException("Identifier type cannot be null or empty");
        }

        return switch (type.trim().toUpperCase()) {
            case "RUN" -> IdentifierType.RUN;
            case "DNI" -> IdentifierType.DNI;
            case "PASSPORT", "PASAPORTE" -> IdentifierType.PASSPORT;
            default -> throw new IllegalArgumentException("Unknown identifier type: " + type);
        };
    }

    public static String toString(IdentifierType type) {
        if (type == null) {
            return null;
        }

        return type.name();
    }
}