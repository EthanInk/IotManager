package ethan.iot.IotManager.repository;

import ethan.iot.IotManager.entities.Control;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ControlRepository extends JpaRepository<Control, Long> {

}
