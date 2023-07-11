package ethan.iot.IotManager.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PublicAccessToken {
    @Id
    private String uuid;

    @OneToOne(fetch = FetchType.EAGER)
    private Attribute attribute;

}
