package ethan.iot.IotManager.controllers;

import ethan.iot.IotManager.DtO.request.AuthRequest;
import ethan.iot.IotManager.DtO.response.AuthenticationResponse;
import ethan.iot.IotManager.DtO.request.RegisterRequest;
import ethan.iot.IotManager.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/security")
@RequiredArgsConstructor
public class SecurityController {

    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            return ResponseEntity.ok(authenticationService.registerUser(registerRequest));
        }catch (Exception e){
            AuthenticationResponse errorResponse = new AuthenticationResponse();
            errorResponse.setError(e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
        }
    }

    @PostMapping("/auth")
    public ResponseEntity<AuthenticationResponse> auth(@Valid @RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authenticationService.authenticateUser(authRequest));
    }

}
