package ethan.iot.IotManager.entities;

import jakarta.persistence.Entity;
import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    USER,
    ADMIN,
    DEVICE,
    SERVER;

    @Override
    public String getAuthority() {
        return name();
    }
}
