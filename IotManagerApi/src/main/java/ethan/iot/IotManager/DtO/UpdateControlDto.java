package ethan.iot.IotManager.DtO;

import ethan.iot.IotManager.entities.DataType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateControlDto {
    @NotNull
    private String name;
    @NotNull
    private long attributeId;
    @NotNull
    private long deviceId;
    @NotNull
    private String controlType;
    private String buttonMessage;
    private DataType buttonMessageFormat;
    private int sliderMin;
    private int sliderMax;
    private String toggleButtonMessageOn;
    private String toggleButtonMessageOff;
}
