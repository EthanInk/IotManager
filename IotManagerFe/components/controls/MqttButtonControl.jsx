"use client";
import {  mqttSendMessage } from "@/fetchData/mqtt/mqttClient";

const MqttButtonControl = ({ control, mqttClient }) => {

  const btnMessageToSend = control.buttonMessageFormat === "NUMBER" ? Number(control.buttonMessage) : control.buttonMessage;

  const sendMessage = () => mqttSendMessage(mqttClient, control, btnMessageToSend)

  return (
    <div>
      <button onClick={sendMessage} className="btn w-full my-6">
        {control.name}
      </button>
    </div>
  );
};

export default MqttButtonControl;
