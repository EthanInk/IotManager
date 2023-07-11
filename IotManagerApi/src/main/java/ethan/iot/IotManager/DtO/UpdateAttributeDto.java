package ethan.iot.IotManager.DtO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAttributeDto {
    private long id;
    private String name;
    private long deviceId;
    private String attributeValueType;
    private String attributeValue;
    private String updateAttributeChannel;
    private String confirmAttributeChannel;
}
