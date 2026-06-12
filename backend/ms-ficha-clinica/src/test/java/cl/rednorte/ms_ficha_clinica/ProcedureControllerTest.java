package cl.rednorte.ms_ficha_clinica;

import cl.rednorte.ms_ficha_clinica.controller.ProcedureController;
import cl.rednorte.ms_ficha_clinica.dto.ProcedureDTO;
import cl.rednorte.ms_ficha_clinica.service.ProcedureService;
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
class ProcedureControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ProcedureService procedureService;

    @InjectMocks
    private ProcedureController procedureController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(procedureController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void createProcedure_ShouldReturnCreated() throws Exception {
        ProcedureDTO dto = new ProcedureDTO();
        when(procedureService.createProcedure(any(ProcedureDTO.class))).thenReturn(dto);

        mockMvc.perform(post("/api/v1/procedures")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(procedureService, times(1)).createProcedure(any(ProcedureDTO.class));
    }

    @Test
    void getProcedureById_WhenExists_ShouldReturnOk() throws Exception {
        ProcedureDTO dto = new ProcedureDTO();
        when(procedureService.getProcedureById("1")).thenReturn(dto);

        mockMvc.perform(get("/api/v1/procedures/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(procedureService, times(1)).getProcedureById("1");
    }

    @Test
    void getProcedureById_WhenNotExists_ShouldReturnNotFound() throws Exception {
        when(procedureService.getProcedureById("99")).thenReturn(null);

        mockMvc.perform(get("/api/v1/procedures/99"))
                .andExpect(status().isNotFound());

        verify(procedureService, times(1)).getProcedureById("99");
    }

    @Test
    void getProceduresByPatientId_ShouldReturnList() throws Exception {
        when(procedureService.getProceduresByPatientId("pat-1")).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/procedures/patient/pat-1"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

        verify(procedureService, times(1)).getProceduresByPatientId("pat-1");
    }

    @Test
    void deleteProcedure_ShouldReturnNoContent() throws Exception {
        doNothing().when(procedureService).deleteProcedure("1");

        mockMvc.perform(delete("/api/v1/procedures/1"))
                .andExpect(status().isNoContent());

        verify(procedureService, times(1)).deleteProcedure("1");
    }
}
