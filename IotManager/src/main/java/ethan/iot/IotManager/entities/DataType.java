package ethan.iot.IotManager.entities;

import org.springframework.security.core.GrantedAuthority;

public enum DataType implements GrantedAuthority {
    STRING,
    NUMBER;

    @Override
    public String getAuthority() {
        return name();
    }
}
