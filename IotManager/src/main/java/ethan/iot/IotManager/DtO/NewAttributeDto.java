package ethan.iot.IotManager.DtO;

import ethan.iot.IotManager.entities.DataType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewAttributeDto {
    private String name;
    private long deviceId;
    private String dataType;
    private String attributeValue;
    private String updateAttributeChannel;
    private String confirmAttributeChannel;
}
