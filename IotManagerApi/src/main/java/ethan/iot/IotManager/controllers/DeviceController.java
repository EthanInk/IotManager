package ethan.iot.IotManager.controllers;

import ethan.iot.IotManager.DtO.DeleteDeviceDto;
import ethan.iot.IotManager.DtO.NewDeviceDto;
import ethan.iot.IotManager.entities.Device;
import ethan.iot.IotManager.entities.LoginDetails;
import ethan.iot.IotManager.exceptions.RegistrationError;
import ethan.iot.IotManager.service.DeviceService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/devices")
@AllArgsConstructor
public class DeviceController {
    private final DeviceService deviceService;

    @GetMapping
    public ResponseEntity<List<Device>> getUserDevices(Authentication authentication) {
        LoginDetails loginDetails = (LoginDetails) authentication.getPrincipal();
        List<Device> devices = deviceService.getUserDevices(loginDetails);
        if (devices == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(devices);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Device> getUserDevices(Authentication authentication, @PathVariable long id) {
        LoginDetails loginDetails = (LoginDetails) authentication.getPrincipal();
        Device device = deviceService.getUserDevice(loginDetails, id);
        return ResponseEntity.ok(device);
    }

    @PostMapping
    public ResponseEntity<Device> addDeviceForUser(Authentication authentication, @Valid @RequestBody NewDeviceDto newDeviceDto) throws RegistrationError {
        LoginDetails authUser = (LoginDetails) authentication.getPrincipal();
        Device newDevice = deviceService.addDeviceForUser(authUser, newDeviceDto);
        return ResponseEntity.ok(newDevice);
    }

    @PatchMapping
    public ResponseEntity<Device> updateDeviceForUser(Authentication authentication, @Valid @RequestBody NewDeviceDto newDeviceDto) throws RegistrationError {
        LoginDetails authUser = (LoginDetails) authentication.getPrincipal();
        Device newDevice = deviceService.addDeviceForUser(authUser, newDeviceDto);
        return ResponseEntity.ok(newDevice);
    }

    @DeleteMapping
    public ResponseEntity deleteDevice(Authentication authentication, @Valid @RequestBody DeleteDeviceDto deleteDeviceDto) {
        LoginDetails authUser = (LoginDetails) authentication.getPrincipal();
        deviceService.deleteDevice(authUser, deleteDeviceDto);
        return ResponseEntity.ok().build();
    }


}
