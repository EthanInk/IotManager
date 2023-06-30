package ethan.iot.IotManager.DtO;


import jakarta.validation.constraints.NotNull;
import lombok.*;


@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MqttAuthRequest extends AuthRequest {
    private String clientid;
    private String topic;
    private String acc;
}
