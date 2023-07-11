"use client";
import { getDevices } from "@/fetchData/frontendToBackend/device";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import React, { useEffect, useState } from "react";
import DeviceCollapse from "./DeviceCollapseDrawer";

const MyDevices = ({devicesData}) => {
  const { data: session, status } = useSession();
  const [devices, setDevices] = useState(devicesData);
  if (status === "unauthenticated") {
    redirect("/");
  }
  async function updateDevices() {
    if (status === "loading") return;
    const res = await getDevices(session.user.token);
    console.log(res);
    if (!res.ok) return;
    const body = await res.json();
    setDevices(body);
  }

  return status === "loading" ? (
    "Loading..."
  ) : devices.length === 0 ? (
    <p>Devices: No devices</p>
  ) : (
    <div className="join join-vertical w-full px-12 py-6">
      {devices.map((device) => {
        return <DeviceCollapse key={device.id} device={device} />;
      })}
    </div>
  );
};

export default MyDevices;
