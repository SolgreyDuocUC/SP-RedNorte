package cl.rednorte.ms_usuarios.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {
    private int addressId;
    private String useAddress;
    private String lineAddress;
    private String cityAddress;
    private String districtAddress;
    private String stateAddress;
    private String countryAddress;
}
