package cl.rednorte.ms_paciente.controller;

import cl.rednorte.ms_paciente.model.PatientEntity;
import cl.rednorte.ms_paciente.repository.PatientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class PatientInternalControllerTest {

    private MockMvc mockMvc;

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private PatientInternalController patientInternalController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(patientInternalController).build();
    }


    @Test
    void findByRut_WhenExists_ShouldReturnPublicDto() throws Exception {
        PatientEntity patient = new PatientEntity();
        patient.setId("1");
        patient.setIdentifierType("RUN");
        patient.setIdentifierValue("12345678-9");
        patient.setFirstName("Juan");
        patient.setLastName("Perez");
        patient.setPhone("123");
        patient.setEmail("juan@test.com");

        when(patientRepository.findByIdentifierTypeAndIdentifierValue("RUN", "12345678-9")).thenReturn(Optional.of(patient));

        mockMvc.perform(get("/internal/patients/by-rut/12345678-9"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(patientRepository, times(1)).findByIdentifierTypeAndIdentifierValue("RUN", "12345678-9");
    }

    @Test
    void findByRut_WhenNotExists_ShouldReturnNotFound() throws Exception {
        when(patientRepository.findByIdentifierTypeAndIdentifierValue("RUN", "12345678-9")).thenReturn(Optional.empty());

        mockMvc.perform(get("/internal/patients/by-rut/12345678-9"))
                .andExpect(status().isNotFound());

        verify(patientRepository, times(1)).findByIdentifierTypeAndIdentifierValue("RUN", "12345678-9");
    }
}
