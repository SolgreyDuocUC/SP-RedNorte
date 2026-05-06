package cl.rednorte.mspaciente.validation.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import cl.rednorte.mspaciente.validation.annotation.ValidRun;

public class RunValidator implements ConstraintValidator<ValidRun, String> {

    @Override
    public boolean isValid(String run, ConstraintValidatorContext context) {
        if (run == null || run.isBlank()) {
            return true;
        }

        // Limpiar puntos y guion, convertir a mayúsculas
        run = run.replace(".", "").replace("-", "").toUpperCase();

        // Mínimo 8 caracteres (7 dígitos + DV)
        if (!run.matches("\\d{7,8}[0-9K]")) {
            return false;
        }

        String cuerpo = run.substring(0, run.length() - 1);
        char dv = run.charAt(run.length() - 1);

        return calcularDV(cuerpo) == dv;
    }

    private char calcularDV(String cuerpo) {
        int suma = 0;
        int multiplo = 2;

        for (int i = cuerpo.length() - 1; i >= 0; i--) {
            suma += Character.getNumericValue(cuerpo.charAt(i)) * multiplo;
            multiplo = (multiplo == 7) ? 2 : multiplo + 1;
        }

        int resto = 11 - (suma % 11);

        if (resto == 11) return '0';
        if (resto == 10) return 'K';

        return (char) (resto + '0');
    }
}
