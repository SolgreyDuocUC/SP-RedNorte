package ms_paciente.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Set;

public class GenderValidator implements ConstraintValidator<ValidGender, String> {

    private static final Set<String> VALID_VALUES = Set.of(
            "male", "female", "other", "unknown",
            "m", "f",
            "masculino", "femenino", "otro"
    );

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) return true; // opcional

        return VALID_VALUES.contains(value.toLowerCase());
    }
}
