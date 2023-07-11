"use client";

import React, { useEffect, useState } from "react";
import { getMqttClient } from "@/fetchData/mqtt/mqttClient";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const MqttToggleButtonControl = () => {
  return (
    <div>
      toggle
    </div>
  )
}

export default MqttToggleButtonControl
