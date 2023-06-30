package ethan.iot.IotManager.service;

import ethan.iot.IotManager.DtO.DeleteControlDto;
import ethan.iot.IotManager.DtO.NewControlDto;
import ethan.iot.IotManager.entities.*;
import ethan.iot.IotManager.repository.AccountRepository;
import ethan.iot.IotManager.repository.AttributeRepository;
import ethan.iot.IotManager.repository.ControlRepository;
import ethan.iot.IotManager.repository.DeviceRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@AllArgsConstructor
public class ControlService {

    private final AccountRepository accountRepository;
    private final DeviceRepository deviceRepository;
    private final AttributeRepository attributeRepository;
    private final ControlRepository controlRepository;

    public Control addControl(LoginDetails authUser, @Valid @RequestBody NewControlDto newControlDto) {
        Account userAccount = accountRepository.findByLoginDetails(authUser).orElseThrow();
        Device deviceControlOwner = deviceRepository.findById(newControlDto.getDeviceId())
                .orElseThrow(() -> new EntityNotFoundException("Device not found"));
        if (!userAccount.getDevices().contains(deviceControlOwner)) throw new AccessDeniedException("Not your device");
        Attribute attributeControlOwner = attributeRepository.findById(newControlDto.getAttributeId())
                .orElseThrow(() -> new EntityNotFoundException("Attribute not found"));
        if (!deviceControlOwner.getAttributes().contains(attributeControlOwner))
            throw new AccessDeniedException("Not your attribute");

        Control newControl = Control.builder()
                .name(newControlDto.getName())
                .controlType(ControlType.valueOf(newControlDto.getControlType()))
                .sliderMin(newControlDto.getSliderMin())
                .sliderMax(newControlDto.getSliderMax())
                .buttonMessage(newControlDto.getButtonMessage())
                .attributes(List.of(attributeControlOwner))
                .build();
        controlRepository.save(newControl);
        deviceControlOwner.addControl(newControl);
        deviceRepository.save(deviceControlOwner);
        return newControl;
    }

    public void deleteControl(LoginDetails authUser, @Valid @RequestBody DeleteControlDto deleteControlDto){
        Account userAccount = accountRepository.findByLoginDetails(authUser).orElseThrow();

        Device deviceToDeleteFrom = deviceRepository.findById(deleteControlDto.getDeviceId())
                .orElseThrow(() -> new EntityNotFoundException("Device not found"));
        if (!userAccount.getDevices().contains(deviceToDeleteFrom))
            throw new AccessDeniedException("Not your device");

        Attribute attributeToDisconnect = attributeRepository.findById(deleteControlDto.getAttributeId())
                .orElseThrow(() -> new EntityNotFoundException("Attribute not found"));
        if (!deviceToDeleteFrom.getAttributes().contains(attributeToDisconnect))
            throw new AccessDeniedException("Not your attribute");

        Control controlToDelete = controlRepository.findById(deleteControlDto.getControlId())
                .orElseThrow(() -> new EntityNotFoundException("Control not found"));
        if (!deviceToDeleteFrom.getControls().contains(controlToDelete))
            throw new AccessDeniedException("Not your attribute");

        deviceToDeleteFrom.deleteControl(controlToDelete);
        deviceRepository.save(deviceToDeleteFrom);
        controlRepository.delete(controlToDelete);

    }
}
