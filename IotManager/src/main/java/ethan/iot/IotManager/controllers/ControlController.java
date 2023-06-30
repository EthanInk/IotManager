package ethan.iot.IotManager.controllers;

import ethan.iot.IotManager.DtO.DeleteControlDto;
import ethan.iot.IotManager.DtO.NewControlDto;
import ethan.iot.IotManager.entities.*;
import ethan.iot.IotManager.repository.*;
import ethan.iot.IotManager.service.AuthenticationService;
import ethan.iot.IotManager.service.ControlService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/controls")
@AllArgsConstructor
public class ControlController {
    private final ControlService controlService;

    @PostMapping
    public ResponseEntity<Control> addControl(Authentication authentication, @Valid @RequestBody NewControlDto newControlDto) {
        LoginDetails authUser = (LoginDetails) authentication.getPrincipal();
        Control newControl = controlService.addControl(authUser, newControlDto);
        return ResponseEntity.ok(newControl);
    }

    @DeleteMapping
    public ResponseEntity deleteControl(Authentication authentication, @Valid @RequestBody DeleteControlDto deleteControlDto){
        LoginDetails authUser = (LoginDetails) authentication.getPrincipal();
        controlService.deleteControl(authUser, deleteControlDto);
        return ResponseEntity.ok().build();
    }

}
