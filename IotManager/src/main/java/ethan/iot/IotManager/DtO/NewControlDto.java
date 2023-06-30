package ethan.iot.IotManager.DtO;

import ethan.iot.IotManager.entities.Attribute;
import ethan.iot.IotManager.entities.ControlType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewControlDto {
    private String name;
    private long attributeId;
    private long deviceId;
    private String controlType;

    private int sliderMin;
    private int sliderMax;
    private String buttonMessage;
    private String toggleButtonMessageOn;
    private String toggleButtonMessageOff;
}
