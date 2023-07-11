import React from "react";
import MqttControl from "./controls/MqttControl";
import Link from "next/link";

const DeviceCollapse = ({ device }) => {
  console.log(device);
  return (
    <div className="collapse collapse-arrow join-item border">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{device.name}</div>
      <Link href={`/devices/${device.id}/edit`}>edit</Link>
      <div className="collapse-content">
        <h3 className="mx-1">Attributes</h3>
        {device.attributes.length === 0 ? (
          <p className="text-xs">None</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra table-xs">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Update channel</th>
                  <th>Confirmation channel</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {device.attributes.map((attribute) => {
                  return (
                    <tr key={attribute.id} className="rounded-none">
                      <td>{attribute.name}</td>
                      <td>{attribute.attributeValue}</td>
                      <td>{attribute.updateAttributeChannel}</td>
                      <td>{attribute.confirmAttributeChannel}</td>
                      <td>
                        <Link href={`/attributes/${attribute.id}/edit`}>edit</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <h3 className="mx-1">Controls</h3>
        {device.controls.length === 0 ? (
          <p className="text-xs">None</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra table-xs">
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {device.controls.map((control) => {
                  return (
                    <tr key={control.id} className="rounded-none">
                      <td>{control.name}</td>
                      <td>
                        <MqttControl control={control} />
                      </td>
                      <td>
                        <Link href={`/controls/${control.id}/edit`}>edit</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceCollapse;
