package ms_paciente.model.mapper;

import ms_paciente.model.types.Gender;

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
