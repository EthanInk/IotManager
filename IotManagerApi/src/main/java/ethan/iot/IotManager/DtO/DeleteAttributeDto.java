package ethan.iot.IotManager.DtO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DeleteAttributeDto {
    private long attributeId;
    private long deviceId;
}
