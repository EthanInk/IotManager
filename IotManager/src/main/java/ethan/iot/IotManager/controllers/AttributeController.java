package ethan.iot.IotManager.controllers;

import ethan.iot.IotManager.DtO.DeleteAttributeDto;
import ethan.iot.IotManager.DtO.NewAttributeDto;
import ethan.iot.IotManager.entities.Account;
import ethan.iot.IotManager.entities.Attribute;
import ethan.iot.IotManager.entities.Device;
import ethan.iot.IotManager.entities.LoginDetails;
import ethan.iot.IotManager.repository.AccountRepository;
import ethan.iot.IotManager.repository.AttributeRepository;
import ethan.iot.IotManager.repository.DeviceRepository;
import ethan.iot.IotManager.service.AttributeService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/attributes")
@AllArgsConstructor
public class AttributeController {
    private final AttributeService attributeService;
    @PostMapping
    public ResponseEntity<Attribute> addAttribute(Authentication authentication, @Valid @RequestBody NewAttributeDto newAttributeDto) {
        LoginDetails authUser = (LoginDetails) authentication.getPrincipal();
        Attribute newAttribute = attributeService.addAttribute(authUser,newAttributeDto);
        return ResponseEntity.ok(newAttribute);
    }

    @DeleteMapping()
    public ResponseEntity deleteAttribute(Authentication authentication, @RequestBody DeleteAttributeDto deleteAttributeDto){
        LoginDetails authUser = (LoginDetails) authentication.getPrincipal();
        attributeService.deleteAttribute(authUser,deleteAttributeDto);
        return ResponseEntity.ok().build();
    }
}
