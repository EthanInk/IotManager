package ethan.iot.IotManager.DtO;

import ethan.iot.IotManager.entities.Attribute;
import ethan.iot.IotManager.entities.AttributeHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeHistoryDtO {
    private Attribute attribute;
    private List<AttributeHistory> attributeHistory;
}
