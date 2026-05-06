package cl.rednorte.mspaciente.validation.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import cl.rednorte.mspaciente.validation.validator.PassportValidator;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PassportValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPassport {
    String message() default "Pasaporte inválido";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
