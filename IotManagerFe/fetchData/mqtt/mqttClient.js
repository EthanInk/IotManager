import { connect } from "mqtt";
import { v4 as uuidv4 } from 'uuid';

const url = "ws://localhost:1888";


export function getMqttClient(user) {
  const options = {
    username: `FE_JWT_${user.username}_${uuidv4()}`,
    password: user.token,
    reconnectPeriod: 2000,
    clientId: `${user.username}_${uuidv4()}`,
    reconnectPeriod: 100,
    keepalive: 30,
  };
  options.password = user.token;
  return connect(url, options);
}

export function connectMqtt(control, status, mqttClient) {
  if (status === "loading") return;
  mqttClient.on("message", function (topic, message) {
    control.attributes.forEach((attribute) => {
      if (attribute.confirmAttributeChannel === topic)
        console.log(message.toString());
    });
  });
  mqttClient.on("connect", function (connack) {
    control.attributes.forEach((attribute) => {
      mqttClient.subscribe(attribute.confirmAttributeChannel);
    });
  });
  mqttClient.on("disconnect", function () {
    control.attributes.forEach((attribute) => {
      mqttClient.unsubscribe(attribute.confirmAttributeChannel);
    });
  });

  return () => {
    control.attributes.forEach((attribute) => {
      mqttClient.unsubscribe(attribute.confirmAttributeChannel);
    });
    mqttClient.end(mqttClient);
  };
}

export function mqttSendMessage(mqttClient, control, messageValue) {
  control.attributes.forEach((attribute) => {
    mqttClient.publish(attribute.updateAttributeChannel, messageValue);
  });
}