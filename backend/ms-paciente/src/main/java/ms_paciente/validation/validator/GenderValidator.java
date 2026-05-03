package ms_paciente.validation.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import ms_paciente.domain.types.Gender;
import ms_paciente.validation.annotation.ValidGender;

import java.util.Arrays;

public class GenderValidator implements ConstraintValidator<ValidGender, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return true;
        }

        return Arrays.stream(Gender.values())
                .anyMatch(g -> g.name().equals(value));
    }
}
