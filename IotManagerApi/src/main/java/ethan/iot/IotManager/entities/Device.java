package ethan.iot.IotManager.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Device {
    @Id
    @GeneratedValue
    private long id;
    @NotNull
    private String name;
    @NotNull
    @JsonIgnore
    @ManyToOne
    private Account ownerAccount;
    @JsonIgnore
    @OneToOne
    private LoginDetails loginDetails;
    @OneToMany(fetch = FetchType.EAGER)
    @ToString.Exclude
    private List<Control> controls;
    @OneToMany(fetch = FetchType.EAGER)
    @ToString.Exclude
    private List<Attribute> attributes;

    public void addAttribute(Attribute newAttribute){
        attributes.add(newAttribute);
    }
    public void deleteAttribute(Attribute deleteAttribute){
        attributes.remove(deleteAttribute);
    }


    public void addControl(Control newControl){
        controls.add(newControl);
    }
    public void deleteControl(Control deleteControl){
        controls.remove(deleteControl);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Device device = (Device) o;
        return id == device.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
