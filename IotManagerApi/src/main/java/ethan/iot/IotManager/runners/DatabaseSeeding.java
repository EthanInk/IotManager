package ethan.iot.IotManager.runners;

import ethan.iot.IotManager.DtO.NewAttributeDto;
import ethan.iot.IotManager.DtO.NewControlDto;
import ethan.iot.IotManager.DtO.NewDeviceDto;
import ethan.iot.IotManager.DtO.request.RegisterRequest;
import ethan.iot.IotManager.entities.Attribute;
import ethan.iot.IotManager.entities.DataType;
import ethan.iot.IotManager.entities.Device;
import ethan.iot.IotManager.entities.LoginDetails;
import ethan.iot.IotManager.repository.LoginRepository;
import ethan.iot.IotManager.service.AttributeService;
import ethan.iot.IotManager.service.AuthenticationService;
import ethan.iot.IotManager.service.ControlService;
import ethan.iot.IotManager.service.DeviceService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class DatabaseSeeding implements CommandLineRunner {
    private final AttributeService attributeService;
    private final AuthenticationService authenticationService;
    private final ControlService controlService;
    private final DeviceService deviceService;
    private final LoginRepository loginRepository;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    @Override
    public void run(String... args) throws Exception { //Remember to remove egear loading
        String PASSWORD = "Ethan@gmail.com";
        String USERNAME = "Ethan@gmail.com";
        String ROOT = "ET";
        authenticationService.registerUser(RegisterRequest.builder().username(USERNAME).password(PASSWORD).topicRoot(ROOT).build());
        LoginDetails user = loginRepository.findById(USERNAME).orElseThrow();
        NewDeviceDto newDeviceDto1 = NewDeviceDto.builder().deviceName("Test device 1").username("test1").password("test").build();
        NewDeviceDto newDeviceDto2 = NewDeviceDto.builder().deviceName("Test device 2").username("test2").password("test").build();
        NewDeviceDto newDeviceDto3 = NewDeviceDto.builder().deviceName("Test device 3").username("test3").password("test").build();
        Device seededDevice1 = deviceService.addDeviceForUser(user, newDeviceDto1);
        deviceService.addDeviceForUser(user, newDeviceDto2);
        deviceService.addDeviceForUser(user, newDeviceDto3);
        NewAttributeDto newAttributeDto1 = NewAttributeDto.builder().name("LED").deviceId(seededDevice1.getId()).attributeValue("0").dataType("NUMBER").updateAttributeChannel("ledUpdate1").confirmAttributeChannel("ledConfirm1").build();
        NewAttributeDto newAttributeDto2 = NewAttributeDto.builder().name("Test attribute 2").deviceId(seededDevice1.getId()).attributeValue("0").dataType("NUMBER").updateAttributeChannel("updateChannel2").confirmAttributeChannel("confirmChannel2").build();
        Attribute seededAttribute1 = attributeService.addAttribute(user, newAttributeDto1);
        Attribute seededAttribute2 = attributeService.addAttribute(user, newAttributeDto2);
        NewControlDto newControlDto1 = NewControlDto.builder().name("LED Off button").attributeId(seededAttribute1.getId()).deviceId(seededDevice1.getId()).controlType("BUTTON").buttonMessageFormat(DataType.NUMBER).buttonMessage("0").build();
        NewControlDto newControlDto2 = NewControlDto.builder().name("LED Brightness").attributeId(seededAttribute1.getId()).deviceId(seededDevice1.getId()).controlType("SLIDER").sliderMax(100).sliderMin(0).build();
        controlService.addControl(user, newControlDto1);
        controlService.addControl(user, newControlDto2);
        logger.info("Done seeding database");
    }
}
