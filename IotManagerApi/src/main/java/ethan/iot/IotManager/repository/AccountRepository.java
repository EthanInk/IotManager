package ethan.iot.IotManager.repository;

import ethan.iot.IotManager.entities.Account;
import ethan.iot.IotManager.entities.LoginDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByLoginDetails(LoginDetails loginDetails);
}
