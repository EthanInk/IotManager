import DeviceForm from "@/components/forms/DeviceForm";
import { getSingleDevice } from "@/fetchData/backendToApi/crud";
import React from "react";

const page = async ({params}) => {

  const device = await  getSingleDevice(params.id);
  return (
    <div className="max-w-3xl m-auto my-12">
      <DeviceForm isUpdate={true} id={id} username={device.username} deviceName={device.deviceName} />
    </div>
  );
};

export default page;
