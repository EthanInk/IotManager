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
public class NewAttributeDto {
    @NotNull
    private String name;
    @NotNull
    private long deviceId;
    @NotNull
    private String dataType;
    @NotNull
    private String attributeValue;
    @NotNull
    private String updateAttributeChannel;
    @NotNull
    private String confirmAttributeChannel;
}
