"use client";

import React, { useState } from "react";
import { mqttSendMessage } from "@/fetchData/mqtt/mqttClient";


const MqttSliderControl = ({ control, mqttClient }) => {
  const [sliderValue, setSliderValue] = useState(
    control?.attributes[0].attributeValue
  );

  const sliderValueChange = (event) => {
    if (event.target.value != sliderValue) {
      mqttSendMessage(mqttClient, control, event.target.value);
    }
    setSliderValue(event.target.value);
  };

  return (
    <>
      <div className="tooltip w-full" data-tip={sliderValue}>
        <input
          type="range"
          min={control?.sliderMin}
          max={control?.sliderMax}
          defaultValue={sliderValue}
          className="range"
          onChange={sliderValueChange}
          step="1"
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
      </div>
    </>
  );
};

export default MqttSliderControl;
