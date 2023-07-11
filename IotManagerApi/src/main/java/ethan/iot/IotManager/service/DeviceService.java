package ethan.iot.IotManager.service;

import ethan.iot.IotManager.DtO.DeleteDeviceDto;
import ethan.iot.IotManager.DtO.NewDeviceDto;
import ethan.iot.IotManager.entities.Account;
import ethan.iot.IotManager.entities.Device;
import ethan.iot.IotManager.entities.LoginDetails;
import ethan.iot.IotManager.exceptions.RegistrationError;
import ethan.iot.IotManager.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final AccountRepository accountRepository;
    private final AuthenticationService authenticationService;
    private final ControlRepository controlRepository;
    private final AttributeRepository attributeRepository;
    private final LoginRepository loginRepository;

    public Device getUserDevice(LoginDetails loginDetails, long id) {
        Optional<Account> userAccount = accountRepository.findByLoginDetails(loginDetails);
        if (userAccount.isEmpty()) throw new EntityNotFoundException("Device not found");
        return userAccount.get().getDevices().stream()
                .filter((device -> device.getId() == id)).findAny()
                .orElseThrow(() -> new EntityNotFoundException("Device not found"));
    }

    public List<Device> getUserDevices(LoginDetails loginDetails) {
        Optional<Account> userAccount = accountRepository.findByLoginDetails(loginDetails);
        return userAccount.map(Account::getDevices).orElse(null);
    }


    public Device addDeviceForUser(LoginDetails authUser, NewDeviceDto newDeviceDto) throws RegistrationError {
        Account userAccount = accountRepository.findByLoginDetails(authUser).orElseThrow();
        LoginDetails deviceLoginDetails = authenticationService.createLoginDetailsDevice(newDeviceDto.getUsername(), newDeviceDto.getPassword());
        Device newDevice = Device.builder().name(newDeviceDto.getDeviceName()).ownerAccount(userAccount).loginDetails(deviceLoginDetails).build();
        deviceRepository.save(newDevice);
        userAccount.addDevice(newDevice);
        accountRepository.save(userAccount);
        return newDevice;
    }


    public void deleteDevice(LoginDetails authUser, DeleteDeviceDto deleteDeviceDto) {
        Account userAccount = accountRepository.findByLoginDetails(authUser).orElseThrow();

        Device deviceToDelete = deviceRepository.findById(deleteDeviceDto.getDeviceId())
                .orElseThrow(() -> new EntityNotFoundException("Device not found"));
        if (!userAccount.getDevices().contains(deviceToDelete))
            throw new AccessDeniedException("Not your device");

        deviceToDelete.getControls().forEach((controlRepository::delete));
        deviceToDelete.getControls().clear();

        deviceToDelete.getAttributes().forEach((attributeRepository::delete));
        deviceToDelete.getAttributes().clear();

        loginRepository.delete(deviceToDelete.getLoginDetails());
        deviceToDelete.setLoginDetails(null);

        deviceRepository.delete(deviceToDelete);
    }
}
