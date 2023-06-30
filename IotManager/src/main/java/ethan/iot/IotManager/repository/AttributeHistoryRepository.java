package ethan.iot.IotManager.repository;

import ethan.iot.IotManager.entities.Attribute;
import ethan.iot.IotManager.entities.AttributeHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AttributeHistoryRepository extends JpaRepository<AttributeHistory, Long> {
}
