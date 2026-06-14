package cl.rednorte.ms_centros.controller;

import cl.rednorte.ms_centros.dto.CentrosDto;
import cl.rednorte.ms_centros.service.CentroService;
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
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class CentroControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CentroService centroService;

    @InjectMocks
    private CentroController centroController;

    private ObjectMapper objectMapper;
    private CentrosDto centroDtoSample;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(centroController).build();
        objectMapper = new ObjectMapper();

        centroDtoSample = CentrosDto.builder()
                .id(1L)
                .name("Centro Médico Villa Alemana")
                .address("Av. Valparaíso 1234")
                .phone("+56912345678")
                .email("villaalemana@rednorte.cl")
                .status("active")
                .specialties(Arrays.asList("Pediatría", "Cardiología"))
                .comuna(new CentrosDto.ComunaResponseDto(45L, "Villa Alemana"))
                .build();
    }

    @Test
    void guardarOActualizar_ShouldReturnCreatedAndDto() throws Exception {
        // Simulamos que el servicio procesa el DTO y retorna el mismo objeto guardado con ID
        when(centroService.guardarOActualizarCentro(any(CentrosDto.class))).thenReturn(centroDtoSample);

        mockMvc.perform(post("/api/v1/locations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(centroDtoSample)))
                .andExpect(status().isCreated()) // Esperamos HTTP 201 Created
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Centro Médico Villa Alemana"))
                .andExpect(jsonPath("$.status").value("active"))
                .andExpect(jsonPath("$.comuna.nombre").value("Villa Alemana"));

        verify(centroService, times(1)).guardarOActualizarCentro(any(CentrosDto.class));
    }

    @Test
    void listarTodos_ShouldReturnList() throws Exception {
        List<CentrosDto> lista = Collections.singletonList(centroDtoSample);
        when(centroService.listarUbicaciones()).thenReturn(lista);

        mockMvc.perform(get("/api/v1/locations"))
                .andExpect(status().isOk()) // Esperamos HTTP 200 OK
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Centro Médico Villa Alemana"))
                .andExpect(jsonPath("$.length()").value(1));

        verify(centroService, times(1)).listarUbicaciones();
    }

    @Test
    void obtenerPorId_ShouldReturnDto() throws Exception {
        when(centroService.obtenerUbicacion(1L)).thenReturn(centroDtoSample);

        mockMvc.perform(get("/api/v1/locations/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Centro Médico Villa Alemana"));

        verify(centroService, times(1)).obtenerUbicacion(1L);
    }

    @Test
    void eliminar_ShouldReturnNoContent() throws Exception {
        // Como el método del service es void, solo le decimos a Mockito que haga "nada"
        doNothing().when(centroService).eliminarUbicacion(1L);

        mockMvc.perform(delete("/api/v1/locations/1"))
                .andExpect(status().isNoContent()); // Esperamos el HTTP 204 No Content estándar

        verify(centroService, times(1)).eliminarUbicacion(1L);
    }
}