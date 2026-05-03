package ms_paciente.domain.mapper;

import ms_paciente.domain.types.Gender;

public class GenderMapper {
    public Gender mapGender(String gender) {
        if (gender == null) return Gender.UNKNOWN;

        return switch (gender.toLowerCase()) {
            case "male", "m", "masculino" -> Gender.MALE;
            case "female", "f", "femenino" -> Gender.FEMALE;
            case "other", "otro" -> Gender.OTHER;
            default -> Gender.UNKNOWN;
        };
    }
}
