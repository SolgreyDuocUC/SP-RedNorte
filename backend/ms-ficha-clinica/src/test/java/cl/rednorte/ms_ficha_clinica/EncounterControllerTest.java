package cl.rednorte.ms_ficha_clinica;

import cl.rednorte.ms_ficha_clinica.controller.EncounterController;
import cl.rednorte.ms_ficha_clinica.dto.EncounterDTO;
import cl.rednorte.ms_ficha_clinica.service.EncounterService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class EncounterControllerTest {

    private MockMvc mockMvc;

    @Mock
    private EncounterService encounterService;

    @InjectMocks
    private EncounterController encounterController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(encounterController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void createEncounter_ShouldReturnCreated() throws Exception {
        EncounterDTO dto = new EncounterDTO();
        when(encounterService.createEncounter(any(EncounterDTO.class))).thenReturn(dto);

        mockMvc.perform(post("/api/v1/encounters")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(encounterService, times(1)).createEncounter(any(EncounterDTO.class));
    }

    @Test
    void getEncounterById_WhenExists_ShouldReturnOk() throws Exception {
        EncounterDTO dto = new EncounterDTO();
        when(encounterService.getEncounterById("1")).thenReturn(dto);

        mockMvc.perform(get("/api/v1/encounters/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(encounterService, times(1)).getEncounterById("1");
    }

    @Test
    void getEncounterById_WhenNotExists_ShouldReturnNotFound() throws Exception {
        when(encounterService.getEncounterById("99")).thenReturn(null);

        mockMvc.perform(get("/api/v1/encounters/99"))
                .andExpect(status().isNotFound());

        verify(encounterService, times(1)).getEncounterById("99");
    }

    @Test
    void getEncountersByPatientId_ShouldReturnList() throws Exception {
        when(encounterService.getEncountersByPatientId("pat-1")).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/encounters/patient/pat-1"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

        verify(encounterService, times(1)).getEncountersByPatientId("pat-1");
    }

    @Test
    void updateStatus_ShouldReturnUpdated() throws Exception {
        EncounterDTO dto = new EncounterDTO();
        when(encounterService.updateStatus("1", "finished")).thenReturn(dto);

        mockMvc.perform(patch("/api/v1/encounters/1/status")
                .param("status", "finished"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(encounterService, times(1)).updateStatus("1", "finished");
    }

    @Test
    void deleteEncounter_ShouldReturnNoContent() throws Exception {
        doNothing().when(encounterService).deleteEncounter("1");

        mockMvc.perform(delete("/api/v1/encounters/1"))
                .andExpect(status().isNoContent());

        verify(encounterService, times(1)).deleteEncounter("1");
    }
}
