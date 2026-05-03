package ms_paciente.validation.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import ms_paciente.validation.annotation.ValidPassport;

public class PassportValidator implements ConstraintValidator<ValidPassport, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return true;
        }

        String passport = value.trim().toUpperCase();

        // Regex según instrucción: ^[A-Z0-9]{6,9}$
        return passport.matches("^[A-Z0-9]{6,9}$");
    }
}
