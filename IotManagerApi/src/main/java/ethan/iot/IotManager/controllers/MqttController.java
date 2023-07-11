package ethan.iot.IotManager.controllers;

import ethan.iot.IotManager.DtO.request.MqttAuthRequest;
import ethan.iot.IotManager.service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/mqtt")
@AllArgsConstructor
public class MqttController {
    private final AuthenticationService authenticationService;

    @PostMapping("/authentication")
    public ResponseEntity authentication(@RequestBody MqttAuthRequest mqttAuthRequest) {
        authenticationService.authenticateMqttServerRequest(mqttAuthRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/authorization")
    public ResponseEntity authorization(@RequestBody MqttAuthRequest mqttAuthRequest) {
        if (authenticationService.authorizationForMqttTopic(mqttAuthRequest)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
