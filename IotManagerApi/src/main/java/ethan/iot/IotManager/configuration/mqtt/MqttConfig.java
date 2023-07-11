package ethan.iot.IotManager.configuration.mqtt;

import ethan.iot.IotManager.entities.LoginDetails;
import ethan.iot.IotManager.service.AttributeService;
import ethan.iot.IotManager.service.AuthenticationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.MessagingGateway;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

@Configuration
@Component
@RequiredArgsConstructor
public class MqttConfig {
    private final AuthenticationService authenticationService;
    private final AttributeService attributeService;
    private final String mqttBrokerUrl = "tcp://localhost:1883";
    private LoginDetails serverDetails = null;

    @Bean
    public MessageChannel mqttInputChannel() {
        return new DirectChannel();
    }

    @Bean
    public MqttPahoMessageDrivenChannelAdapter mqttInbound() {
        MqttPahoMessageDrivenChannelAdapter adapter =
                new MqttPahoMessageDrivenChannelAdapter(mqttBrokerUrl, getServerLoginDetails().getUsername(), mqttClientFactory(), "#");
        adapter.setCompletionTimeout(5000);
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(1);
        adapter.setOutputChannel(mqttInputChannel());
        return adapter;
    }

    @Transactional
    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void messageReceiver(Message<String> message) {
        String topic = message.getHeaders().get("mqtt_receivedTopic", String.class);
        System.out.println("Received message on topic: " + topic);
        String payload = message.getPayload();
        System.out.println("Payload: " + payload);
        assert topic != null;
        attributeService.processAttributeUpdate(payload, topic);
    }

    @Bean
    public MessageChannel mqttOutputChannel() {
        return new DirectChannel();
    }

    @Bean
    @ServiceActivator(inputChannel = "mqttOutputChannel")
    public MessageHandler mqttOutbound(MqttPahoClientFactory mqttClientFactory) {

        MqttPahoMessageHandler messageHandler = new MqttPahoMessageHandler(getServerLoginDetails().getUsername(), mqttClientFactory);
        messageHandler.setAsync(true);
        messageHandler.setDefaultQos(1);
        return messageHandler;
    }

    @Bean
    public MqttPahoClientFactory mqttClientFactory() {
        DefaultMqttPahoClientFactory clientFactory = new DefaultMqttPahoClientFactory();
        MqttConnectOptions options = new MqttConnectOptions();
        options.setServerURIs(new String[]{mqttBrokerUrl});
        options.setAutomaticReconnect(true);
        options.setConnectionTimeout(1000);
        options.setMaxReconnectDelay(1000);
        options.setUserName(getServerLoginDetails().getUsername());
        options.setPassword(getServerLoginDetails().getPassword().toCharArray());
        clientFactory.setConnectionOptions(options);
        return clientFactory;
    }

    private LoginDetails getServerLoginDetails(){
        if (serverDetails == null){
            serverDetails = authenticationService.createServerLoginDetails();
        }
        return serverDetails;
    }

    @MessagingGateway(defaultRequestChannel = "mqttOutputChannel")
    public interface MqttGateway {
        void sendMessage(String payload, @Header("mqtt_topic") String topic);
    }

}

