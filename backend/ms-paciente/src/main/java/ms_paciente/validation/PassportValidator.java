package ms_paciente.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PassportValidator implements ConstraintValidator<ValidPassport, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {

        if (value == null || value.isBlank()) {
            return true; // opcional, usa @NotBlank si lo quieres obligatorio
        }

        String passport = value.trim().toUpperCase();

        // Regla general internacional:
        // - Alfanumérico
        // - Entre 6 y 9 caracteres
        return passport.matches("^[A-Z0-9]{6,9}$");
    }
}
