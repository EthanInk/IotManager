package ethan.iot.IotManager.DtO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewDeviceDto {
    @NotNull
    private String username;
    @NotNull
    private String password;
    @NotNull
    private String deviceName;
}
