package ethan.iot.IotManager.repository;

import ethan.iot.IotManager.entities.Device;
import ethan.iot.IotManager.entities.Account;
import ethan.iot.IotManager.entities.LoginDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    public Optional<List<Device>> findByOwnerAccount(Account account);
    public Optional<Device> findByLoginDetails(LoginDetails loginDetails);
}
