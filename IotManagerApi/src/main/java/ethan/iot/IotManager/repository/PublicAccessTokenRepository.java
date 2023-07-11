package ethan.iot.IotManager.repository;

import ethan.iot.IotManager.entities.PublicAccessToken;
import org.springframework.data.jpa.repository.JpaRepository;

//@Repository
public interface PublicAccessTokenRepository extends JpaRepository<PublicAccessToken, String> {
}
