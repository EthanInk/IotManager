package ethan.iot.IotManager.controllers;

import ethan.iot.IotManager.DtO.DeleteAttributeDto;
import ethan.iot.IotManager.DtO.NewAttributeDto;
import ethan.iot.IotManager.entities.Attribute;
import ethan.iot.IotManager.entities.AttributeHistory;
import ethan.iot.IotManager.entities.LoginDetails;
import ethan.iot.IotManager.service.AttributeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/attributes")
@AllArgsConstructor
public class AttributeController {
    private final AttributeService attributeService;

    @GetMapping("/{id}")
    public ResponseEntity<Attribute> getAttribute(Authentication authentication, @PathVariable long id) {
        LoginDetails authUser = (LoginDetails) authentication.getPrincipal();
        Attribute attribute = attributeService.getAttribute(authUser, id);
        if (attribute == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(attribute);
    }
    @GetMapping("/{id}/history")
    public ResponseEntity<List<AttributeHistory>> getAttributeHistory(Authentication authentication, @PathVariable long id) {
        LoginDetails authUser = (LoginDetails) authentication.getPrincipal();
        List<AttributeHistory> attributeHistories = attributeService.getAttributeHistory(authUser, id);
        return ResponseEntity.ok(attributeHistories);
    }

    @PostMapping
    public ResponseEntity<Attribute> addAttribute(Authentication authentication, @Valid @RequestBody NewAttributeDto newAttributeDto) {
        LoginDetails authUser = (LoginDetails) authentication.getPrincipal();
        Attribute newAttribute = attributeService.addAttribute(authUser, newAttributeDto);
        return ResponseEntity.ok(newAttribute);
    }

    @DeleteMapping
    public ResponseEntity deleteAttribute(Authentication authentication, @RequestBody DeleteAttributeDto deleteAttributeDto) {
        LoginDetails authUser = (LoginDetails) authentication.getPrincipal();
        attributeService.deleteAttribute(authUser, deleteAttributeDto);
        return ResponseEntity.ok().build();
    }
}
