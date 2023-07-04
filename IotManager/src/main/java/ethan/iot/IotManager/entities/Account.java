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
public class Account {
    @Id
    @GeneratedValue
    private long id;
    @NotNull
    @Column(unique = true)
    private String topicRoot;
    @NotNull
    @OneToOne
    private LoginDetails loginDetails;
    @OneToMany(mappedBy = "ownerAccount", fetch = FetchType.EAGER)
    @JsonIgnore
    @ToString.Exclude
    private List<Device> devices;
    @OneToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    @ToString.Exclude
    private List<PublicAccessToken> publicAccessTokens;

    public void addDevice(Device newDevice) {
        devices.add(newDevice);
    }

    public void deleteDevice(Device deleteDevice) {
        devices.remove(deleteDevice);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return id == account.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public void addPublicAccessToken(PublicAccessToken newToken) {
        publicAccessTokens.add(newToken);
    }
}
