package ms_paciente.validation;

import jakarta.validation.Constraint;

import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PassportValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPassport {

    String message() default "Pasaporte inválido";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
