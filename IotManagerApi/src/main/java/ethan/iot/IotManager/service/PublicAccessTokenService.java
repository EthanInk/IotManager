package ethan.iot.IotManager.service;

import ethan.iot.IotManager.entities.Account;
import ethan.iot.IotManager.entities.Attribute;
import ethan.iot.IotManager.entities.LoginDetails;
import ethan.iot.IotManager.entities.PublicAccessToken;
import ethan.iot.IotManager.repository.AccountRepository;
import ethan.iot.IotManager.repository.PublicAccessTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class PublicAccessTokenService {
    private final PublicAccessTokenRepository publicAccessTokenRepository;
    private final AccountRepository accountRepository;

    public PublicAccessToken createNewToken(LoginDetails loginDetails, Attribute attribute) {
        Account userAccount = accountRepository.findByLoginDetails(loginDetails).orElseThrow();
        String uuid;
        do {
            uuid = UUID.randomUUID().toString();
        } while (publicAccessTokenRepository.existsById(uuid));

        PublicAccessToken newToken = PublicAccessToken.builder().uuid(uuid).attribute(attribute).build();
        publicAccessTokenRepository.save(newToken);
        userAccount.addPublicAccessToken(newToken);
        accountRepository.save(userAccount);
        return newToken;
    }
}
