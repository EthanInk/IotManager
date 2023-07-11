package ethan.iot.IotManager.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.Objects;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Control {
    @Id
    @GeneratedValue
    private long id;
    @NotNull
    private String name;
    @NotNull
    private ControlType controlType;
    //SLIDER
    private int sliderMin;
    private int sliderMax;
    //BUTTON
    private String buttonMessage;
    private DataType buttonMessageFormat;
    //TOGGLE_BUTTON
    private String toggleButtonMessageOn;
    private String toggleButtonMessageOff;

    @ManyToMany(fetch = FetchType.EAGER)
    @ToString.Exclude
    private List<Attribute> attributes;

    public void addAttribute(Attribute addAttribute){
        attributes.add(addAttribute);
    }

    public void deleteAttribute(Attribute removeAttribute){
        attributes.remove(removeAttribute);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Control control = (Control) o;
        return id == control.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
