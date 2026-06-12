package cl.rednorte.ms_ficha_clinica;

import cl.rednorte.ms_ficha_clinica.controller.ClinicalNoteController;
import cl.rednorte.ms_ficha_clinica.dto.ClinicalNoteDTO;
import cl.rednorte.ms_ficha_clinica.service.ClinicalNoteService;
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

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class ClinicalNoteControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ClinicalNoteService clinicalNoteService;

    @InjectMocks
    private ClinicalNoteController clinicalNoteController;

    private ObjectMapper objectMapper;
    private ClinicalNoteDTO sampleDTO;

    @BeforeEach
    void setUp() {
        // Inicializa MockMvc en modo Standalone para probar solo el controlador
        mockMvc = MockMvcBuilders.standaloneSetup(clinicalNoteController).build();
        objectMapper = new ObjectMapper();

        // Configuración de un DTO base para los tests
        sampleDTO = new ClinicalNoteDTO();
        // Asume que tu DTO tiene setters básicos (ajústalo según tus campos reales)
        // sampleDTO.setId("123");
        // sampleDTO.setContent("Nota clínica de ejemplo");
    }

    @Test
    void createClinicalNote_ShouldReturnCreatedNote() throws Exception {
        // Given
        when(clinicalNoteService.createClinicalNote(any(ClinicalNoteDTO.class))).thenReturn(sampleDTO);

        // When & Then
        mockMvc.perform(post("/api/v1/clinical-notes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(sampleDTO)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(clinicalNoteService, times(1)).createClinicalNote(any(ClinicalNoteDTO.class));
    }

    @Test
    void getClinicalNoteById_WhenExists_ShouldReturnNote() throws Exception {
        // Given
        String noteId = "123";
        when(clinicalNoteService.getClinicalNoteById(noteId)).thenReturn(sampleDTO);

        // When & Then
        mockMvc.perform(get("/api/v1/clinical-notes/{id}", noteId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(clinicalNoteService, times(1)).getClinicalNoteById(noteId);
    }

    @Test
    void getClinicalNoteById_WhenNotExists_ShouldReturnNotFound() throws Exception {
        // Given
        String noteId = "999";
        when(clinicalNoteService.getClinicalNoteById(noteId)).thenReturn(null);

        // When & Then
        mockMvc.perform(get("/api/v1/clinical-notes/{id}", noteId))
                .andExpect(status().isNotFound());

        verify(clinicalNoteService, times(1)).getClinicalNoteById(noteId);
    }

    @Test
    void getClinicalNotesByPatientId_ShouldReturnList() throws Exception {
        // Given
        String patientId = "pat-01";
        List<ClinicalNoteDTO> notesList = Arrays.asList(sampleDTO);
        when(clinicalNoteService.getClinicalNotesByPatientId(patientId)).thenReturn(notesList);

        // When & Then
        mockMvc.perform(get("/api/v1/clinical-notes/patient/{patientId}", patientId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(clinicalNoteService, times(1)).getClinicalNotesByPatientId(patientId);
    }

    @Test
    void getClinicalNotesByEncounterId_ShouldReturnList() throws Exception {
        // Given
        String encounterId = "enc-02";
        List<ClinicalNoteDTO> notesList = Arrays.asList(sampleDTO);
        when(clinicalNoteService.getClinicalNotesByEncounterId(encounterId)).thenReturn(notesList);

        // When & Then
        mockMvc.perform(get("/api/v1/clinical-notes/encounter/{encounterId}", encounterId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(clinicalNoteService, times(1)).getClinicalNotesByEncounterId(encounterId);
    }

    @Test
    void deleteClinicalNote_ShouldReturnNoContent() throws Exception {
        // Given
        String noteId = "123";
        doNothing().when(clinicalNoteService).deleteClinicalNote(noteId);

        // When & Then
        mockMvc.perform(delete("/api/v1/clinical-notes/{id}", noteId))
                .andExpect(status().isNoContent());

        verify(clinicalNoteService, times(1)).deleteClinicalNote(noteId);
    }
}
