package cl.rednorte.mspaciente.validation.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import cl.rednorte.mspaciente.domain.types.Gender;
import cl.rednorte.mspaciente.validation.annotation.ValidGender;

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
