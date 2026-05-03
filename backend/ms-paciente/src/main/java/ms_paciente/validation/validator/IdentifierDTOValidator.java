package ms_paciente.validation.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import ms_paciente.domain.types.IdentifierType;
import ms_paciente.dto.IdentifierDTO;
import ms_paciente.validation.annotation.ValidIdentifier;

public class IdentifierDTOValidator implements ConstraintValidator<ValidIdentifier, IdentifierDTO> {

    private final RunValidator runValidator = new RunValidator();
    private final PassportValidator passportValidator = new PassportValidator();

    @Override
    public boolean isValid(IdentifierDTO dto, ConstraintValidatorContext context) {
        if (dto == null || dto.getType() == null || dto.getValue() == null) {
            return true;
        }

        boolean isValid = true;
        String message = "";

        if (dto.getType() == IdentifierType.RUN) {
            isValid = runValidator.isValid(dto.getValue(), context);
            message = "RUN chileno inválido (formato o DV incorrecto)";
        } else if (dto.getType() == IdentifierType.PASSPORT) {
            isValid = passportValidator.isValid(dto.getValue(), context);
            message = "Pasaporte inválido (debe ser alfanumérico de 6-9 caracteres)";
        }

        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(message)
                    .addPropertyNode("value")
                    .addConstraintViolation();
        }

        return isValid;
    }
}
