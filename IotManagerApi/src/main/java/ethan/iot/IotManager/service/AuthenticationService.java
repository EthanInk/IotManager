package ethan.iot.IotManager.service;

import ethan.iot.IotManager.DtO.request.AuthRequest;
import ethan.iot.IotManager.DtO.response.AuthenticationResponse;
import ethan.iot.IotManager.DtO.request.MqttAuthRequest;
import ethan.iot.IotManager.DtO.request.RegisterRequest;
import ethan.iot.IotManager.configuration.security.JWTService;
import ethan.iot.IotManager.entities.Account;
import ethan.iot.IotManager.entities.Device;
import ethan.iot.IotManager.entities.LoginDetails;
import ethan.iot.IotManager.entities.Role;
import ethan.iot.IotManager.exceptions.RegistrationError;
import ethan.iot.IotManager.repository.AccountRepository;
import ethan.iot.IotManager.repository.DeviceRepository;
import ethan.iot.IotManager.repository.LoginRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final AccountRepository accountRepository;
    private final LoginRepository loginRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    private final DeviceRepository deviceRepository;

    public AuthenticationResponse registerUser(RegisterRequest registerRequest) throws RegistrationError {
        Optional<LoginDetails> existingUser = loginRepository.findById(registerRequest.getUsername());
        if (existingUser.isPresent()) {
            throw new RegistrationError("Username taken");
        }
        LoginDetails newUserLoginDetails = createLoginDetails(registerRequest.getUsername(), registerRequest.getPassword());

        Account newUserAccount = Account.builder().topicRoot(registerRequest.getTopicRoot()).loginDetails(newUserLoginDetails).build();
        accountRepository.save(newUserAccount);
        String jwtToken = jwtService.generateToken(newUserLoginDetails);
        return AuthenticationResponse.builder().Token(jwtToken).build();
    }

    public AuthenticationResponse authenticateUser(AuthRequest authRequest) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authRequest.getUsername(),
                authRequest.getPassword()
        ));
        LoginDetails userLoginDetails = (LoginDetails) auth.getPrincipal();
        String jwtToken = jwtService.generateToken(userLoginDetails);
        return AuthenticationResponse.builder().Token(jwtToken).username(userLoginDetails.getUsername()).build();
    }
    public LoginDetails createLoginDetails(String username, String password) {
        LoginDetails newLoginDetails = LoginDetails.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .enabled(true)
                .role(Role.USER)
                .build();
        loginRepository.save(newLoginDetails);
        return newLoginDetails;
    }

    public LoginDetails createLoginDetailsDevice(String username, String password) {
        LoginDetails newLoginDetails = LoginDetails.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .enabled(true)
                .role(Role.DEVICE)
                .build();
        loginRepository.save(newLoginDetails);
        return newLoginDetails;
    }

    public LoginDetails createServerLoginDetails() {
        String username = UUID.randomUUID().toString();
        String password = UUID.randomUUID().toString();
        LoginDetails newLoginDetailsNonEncoded = LoginDetails.builder()
                .username(username)
                .password(password)
                .enabled(true)
                .role(Role.SERVER)
                .build();
        LoginDetails newLoginDetails = LoginDetails.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .enabled(true)
                .role(Role.SERVER)
                .build();
        loginRepository.save(newLoginDetails);
        return newLoginDetailsNonEncoded;
    }

    public void authenticateMqttServerRequest(MqttAuthRequest mqttAuthRequest) {
        if (mqttAuthRequest.getUsername().contains("FE_JWT_")) {
            Optional<LoginDetails> user = loginRepository.findById(extractFeJwtUsername(mqttAuthRequest.getUsername()));
            if (user.isEmpty()) throw new EntityNotFoundException("Username in JWT not found");
            jwtService.isTokenValid(mqttAuthRequest.getPassword(), user.get());
        }
        else if(!mqttAuthRequest.getClientid().equals(mqttAuthRequest.getUsername())){
            throw new EntityNotFoundException("Username and Id don't match");
        }
        else {
            authenticateUser(mqttAuthRequest);
        }
    }

    private String extractFeJwtUsername(String encodedString){
        return encodedString.replace("FE_JWT_", "").substring(0, encodedString.length() - 44);
    }

    public boolean authorizationForMqttTopic(MqttAuthRequest mqttAuthRequest) {
        String username = mqttAuthRequest.getUsername();
        if (username.contains("FE_JWT_")) {
            username = extractFeJwtUsername(mqttAuthRequest.getUsername());
        }
        Optional<LoginDetails> user = loginRepository.findById(username);
        if (user.isEmpty()) return false;

        LoginDetails loginDetails = user.get();

        if (loginDetails.getRole().equals(Role.DEVICE)) return isDeviceTopicAllowed(loginDetails, mqttAuthRequest.getTopic());

        if (loginDetails.getRole().equals(Role.USER)) return isUserTopicAllowed(loginDetails, mqttAuthRequest.getTopic());

        if (loginDetails.getRole().equals(Role.SERVER)) return isServerTopicAllowed();

        return false;
    }

    private boolean isDeviceTopicAllowed(LoginDetails loginDetails, String topic){
        Optional<Device> deviceOptional = deviceRepository.findByLoginDetails(loginDetails);
        if (deviceOptional.isEmpty()) return false;

        Device device = deviceOptional.get();
        return device.getAttributes().stream()
                .map(attribute -> List.of(attribute.getConfirmAttributeChannel(), attribute.getUpdateAttributeChannel()))
                .flatMap(Collection::stream)
                .anyMatch(attribute -> attribute.equalsIgnoreCase(topic));
    }

    private boolean isUserTopicAllowed(LoginDetails userLoginDetails, String topic){
        Optional<Account> userAccount = accountRepository.findByLoginDetails(userLoginDetails);
        if (userAccount.isEmpty()) return false;
        List<Device> devices = userAccount.get().getDevices();
        return devices.stream()
                .flatMap(device -> device.getAttributes().stream())
                .map(attribute -> List.of(attribute.getConfirmAttributeChannel(), attribute.getUpdateAttributeChannel()))
                .flatMap(Collection::stream)
                .anyMatch(attribute -> attribute.equalsIgnoreCase(topic));
    }

    private boolean isServerTopicAllowed(){
        return true;
    }
}
