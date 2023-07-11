package ethan.iot.IotManager.repository;

import ethan.iot.IotManager.entities.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AttributeRepository extends JpaRepository<Attribute, Long> {
    public Optional<Attribute> findByConfirmAttributeChannel(String confirmAttributeChannel);
}
