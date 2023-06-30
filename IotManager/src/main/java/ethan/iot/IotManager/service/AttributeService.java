package ethan.iot.IotManager.service;

import ethan.iot.IotManager.DtO.DeleteAttributeDto;
import ethan.iot.IotManager.DtO.NewAttributeDto;
import ethan.iot.IotManager.entities.*;
import ethan.iot.IotManager.repository.AccountRepository;
import ethan.iot.IotManager.repository.AttributeHistoryRepository;
import ethan.iot.IotManager.repository.AttributeRepository;
import ethan.iot.IotManager.repository.DeviceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AttributeService {

    private final AccountRepository accountRepository;
    private final DeviceRepository deviceRepository;
    private final AttributeRepository attributeRepository;
    private final AttributeHistoryRepository attributeHistoryRepository;

    public Attribute addAttribute(LoginDetails authUser, NewAttributeDto newAttributeDto) {
        Account userAccount = accountRepository.findByLoginDetails(authUser).orElseThrow();
        Device deviceAttributeOwner = deviceRepository.findById(newAttributeDto.getDeviceId())
                .orElseThrow(() -> new EntityNotFoundException("Device not found"));
        if (!userAccount.getDevices().contains(deviceAttributeOwner))
            throw new AccessDeniedException("Not your device");

        //channel names must be unique across all devices with in a users account

        Attribute newAttribute = Attribute.builder()
                .name(newAttributeDto.getName())
                .attributeValue(newAttributeDto.getAttributeValue())
                .attributeValueType(DataType.valueOf(newAttributeDto.getDataType()))
                .updateAttributeChannel(userAccount.getTopicRoot() + "/u/" + newAttributeDto.getUpdateAttributeChannel())
                .confirmAttributeChannel(userAccount.getTopicRoot() + "/c/" + newAttributeDto.getConfirmAttributeChannel())
                .build();
        attributeRepository.save(newAttribute);
        deviceAttributeOwner.addAttribute(newAttribute);
        deviceRepository.save(deviceAttributeOwner);
        return newAttribute;
    }

    public void deleteAttribute(LoginDetails authUser, DeleteAttributeDto deleteAttributeDto) {
        Account userAccount = accountRepository.findByLoginDetails(authUser).orElseThrow();

        Device deviceToDeleteFrom = deviceRepository.findById(deleteAttributeDto.getDeviceId())
                .orElseThrow(() -> new EntityNotFoundException("Device not found"));

        if (!userAccount.getDevices().contains(deviceToDeleteFrom))
            throw new AccessDeniedException("Not your device");

        Attribute attributeToDelete = attributeRepository.findById(deleteAttributeDto.getAttributeId())
                .orElseThrow(() -> new EntityNotFoundException("Attribute not found"));

        if (!deviceToDeleteFrom.getAttributes().contains(attributeToDelete))
            throw new AccessDeniedException("Not your attribute");

        deviceToDeleteFrom.deleteAttribute(attributeToDelete);
        deviceRepository.save(deviceToDeleteFrom);
        attributeRepository.delete(attributeToDelete);
    }

    public void processAttributeUpdate(Map<String, Object> payload, String topic) {
        String[] topicChannels = topic.split("/");
        if(!topicChannels[1].equalsIgnoreCase("c")) return;
        Optional<Attribute> attributeOptional = attributeRepository.findByConfirmAttributeChannel(topic);
        if (attributeOptional.isEmpty()) return;
        Attribute updatedAttribute = attributeOptional.get();
        String newAttributeValue = (String) payload.get(updatedAttribute.getName());
        AttributeHistory newAttributeHistory = AttributeHistory.builder()
                .timeOfUpdate(LocalDateTime.now())
                .attributeValue(newAttributeValue)
                .build();
        updatedAttribute.addAttributeHistory(newAttributeHistory);
        updatedAttribute.setAttributeValue(newAttributeValue);
        attributeHistoryRepository.save(newAttributeHistory);
        attributeRepository.save(updatedAttribute);
    }
}
