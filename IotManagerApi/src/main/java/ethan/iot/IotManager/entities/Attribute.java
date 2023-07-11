package ethan.iot.IotManager.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.Objects;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Attribute {
    @Id
    @GeneratedValue
    private long id;
    @NotNull
    private String name;
    @NotNull
    private DataType attributeValueType;
    @NotNull
    private String attributeValue;
    private String updateAttributeChannel;
    private String confirmAttributeChannel;
    @OneToMany
    @JsonIgnore
    @ToString.Exclude
    private List<AttributeHistory> attributeHistory;

    public void addAttributeHistory(AttributeHistory addAttributeHistory) {
        attributeHistory.add(addAttributeHistory);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Attribute attribute = (Attribute) o;
        return id == attribute.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
