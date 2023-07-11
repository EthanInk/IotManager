package ethan.iot.IotManager.repository;

import ethan.iot.IotManager.entities.LoginDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<LoginDetails, String> {
}
