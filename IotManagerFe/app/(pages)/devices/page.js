import MyDevices from "@/components/MyDevices";
import { getDevices } from "@/fetchData/backendToApi/crud";
import React from "react";

const Device = async () => {
  const backendData = await getDevices();
  return (
    <div>
      <MyDevices devicesData={backendData.body} />
    </div>
  );
};

export default Device;
export const dynamic = "force-dynamic";
