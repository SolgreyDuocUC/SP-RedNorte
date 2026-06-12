package cl.rednorte.ms_paciente.controller;

import cl.rednorte.ms_paciente.dto.PatientContactDTO;
import cl.rednorte.ms_paciente.dto.PatientDTO;
import cl.rednorte.ms_paciente.service.PatientService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class PatientControllerTest {

    private MockMvc mockMvc;

    @Mock
    private PatientService patientService;

    @InjectMocks
    private PatientController patientController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(patientController)
                .setCustomArgumentResolvers(new org.springframework.data.web.PageableHandlerMethodArgumentResolver())
                .build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void createPatient_ShouldReturnCreated() throws Exception {
        PatientDTO dto = new PatientDTO();
        when(patientService.create(any(PatientDTO.class))).thenReturn(dto);

        mockMvc.perform(post("/api/v1/patients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(patientService, times(1)).create(any(PatientDTO.class));
    }

    @Test
    void createOrUpdate_ShouldReturnOk() throws Exception {
        PatientDTO dto = new PatientDTO();
        when(patientService.createOrUpdate(any(PatientDTO.class))).thenReturn(dto);

        mockMvc.perform(put("/api/v1/patients/upsert")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(patientService, times(1)).createOrUpdate(any(PatientDTO.class));
    }

    @Test
    void updatePatient_ShouldReturnOk() throws Exception {
        PatientDTO dto = new PatientDTO();
        when(patientService.update(eq("1"), any(PatientDTO.class))).thenReturn(dto);

        mockMvc.perform(put("/api/v1/patients/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(patientService, times(1)).update(eq("1"), any(PatientDTO.class));
    }

    @Test
    void updateContact_ShouldReturnOk() throws Exception {
        PatientContactDTO dto = new PatientContactDTO("123456789", "test@test.com", "address");
        PatientDTO patientDto = new PatientDTO();
        when(patientService.updateContact(eq("1"), any(PatientContactDTO.class))).thenReturn(patientDto);

        mockMvc.perform(patch("/api/v1/patients/1/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(patientService, times(1)).updateContact(eq("1"), any(PatientContactDTO.class));
    }

    @Test
    void findByIdentifier_WhenExists_ShouldReturnOk() throws Exception {
        PatientDTO dto = new PatientDTO();
        when(patientService.findByIdentifier("RUN", "12345678-9")).thenReturn(Optional.of(dto));

        mockMvc.perform(get("/api/v1/patients/identifier/RUN/12345678-9"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(patientService, times(1)).findByIdentifier("RUN", "12345678-9");
    }

    @Test
    void findByIdentifier_WhenNotExists_ShouldReturnNotFound() throws Exception {
        when(patientService.findByIdentifier("RUN", "12345678-9")).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/patients/identifier/RUN/12345678-9"))
                .andExpect(status().isNotFound());

        verify(patientService, times(1)).findByIdentifier("RUN", "12345678-9");
    }

    @Test
    void findById_WhenExists_ShouldReturnOk() throws Exception {
        PatientDTO dto = new PatientDTO();
        when(patientService.findById("1")).thenReturn(Optional.of(dto));

        mockMvc.perform(get("/api/v1/patients/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(patientService, times(1)).findById("1");
    }

    @Test
    void findAll_ShouldReturnPage() throws Exception {
        Page<PatientDTO> page = new PageImpl<>(List.of(new PatientDTO()));
        when(patientService.findAll(any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/patients")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(patientService, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void deletePatient_ShouldReturnNoContent() throws Exception {
        doNothing().when(patientService).delete("1");

        mockMvc.perform(delete("/api/v1/patients/1"))
                .andExpect(status().isNoContent());

        verify(patientService, times(1)).delete("1");
    }
}
