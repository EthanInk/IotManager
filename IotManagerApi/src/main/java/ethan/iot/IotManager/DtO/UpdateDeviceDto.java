package ethan.iot.IotManager.DtO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateDeviceDto {
    private long id;
    private String username;
    private String password;
    private String deviceName;
}
