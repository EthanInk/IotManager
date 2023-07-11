"use client"

import React, { useEffect, useState } from "react";
import MqttButtonControl from "./MqttButtonControl";
import MqttSliderControl from "./MqttSliderControl";
import MqttToggleButtonControl from "./MqttToggleButtonControl";
import { connectMqtt, getMqttClient } from "@/fetchData/mqtt/mqttClient";
import { useSession } from "next-auth/react";

const MqttControl = ({ control }) => {

  const { data: session, status } = useSession();
  const [mqttClient, setMqttClient] = useState(getMqttClient(session.user));

  useEffect(() => {
    return connectMqtt(control, status, mqttClient);
  }, [status]);

  {
    switch (control.controlType) {
      case "BUTTON":
        return <MqttButtonControl control={control} mqttClient={mqttClient}/>;
      case "SLIDER":
        return <MqttSliderControl control={control} mqttClient={mqttClient}/>;
      case "TOGGLE":
        return <MqttToggleButtonControl control={control} mqttClient={mqttClient}/>;
    }
  }
};

export default MqttControl;
