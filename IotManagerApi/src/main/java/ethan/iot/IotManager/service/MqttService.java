package ethan.iot.IotManager.service;

import ethan.iot.IotManager.configuration.mqtt.MqttConfig;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class MqttService {
    private final MqttConfig.MqttGateway mqttGateway;

    public void sendMessage(String message, String topic) {
        mqttGateway.sendMessage(message, topic);
    }

}
