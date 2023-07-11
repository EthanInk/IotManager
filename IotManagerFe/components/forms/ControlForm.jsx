"use client";

import { getDevices, newControl } from "@/fetchData/frontendToBackend/device";
import ControlSchema from "@/schema/ControlSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const ControlForm = ({
  isUpdate = false,
  id,
  name,
  deviceId,
  attributeId,
  controlType,
  sliderMin,
  sliderMax,
  buttonMessage,
  buttonMessageFormat,
  toggleButtonMessageOn,
  toggleButtonMessageOff,
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [globalError, setGlobalError] = useState("");
  const [devices, setDevices] = useState([]);
  const [devicesSelectOptions, setDevicesSelectOptions] = useState([]);
  const [attributeSelectOptions, setAttributeSelectOptions] = useState([]);

  if (status === "unauthenticated") {
    redirect("/");
  }

  async function updateDevices() {
    if (status === "loading") return;
    const res = await getDevices(session.user.token);
    if (!res.ok) return;
    const body = await res.json();
    setDevices(body);
    const deviceOptions = body.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
    setDevicesSelectOptions(deviceOptions);
  }

  async function updateAttributes(deviceId) {
    if (deviceId === "-1") return;
    const selectedDevice = devices.find((device) => device.id == deviceId);
    if (!selectedDevice) return;
    const attributeOptions = selectedDevice.attributes.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
    setAttributeSelectOptions(attributeOptions);
  }

  useEffect(() => {
    updateDevices();
  }, [status]);

  async function onSubmitForm(values) {
    const formData = {
      id: isUpdate ? id : undefined,
      name: values.name !== name ? values.name : undefined,
      deviceId: values.deviceId !== deviceId ? values.deviceId : undefined,
      attributeId:
        values.attributeId !== attributeId ? values.attributeId : undefined,
      controlType:
        values.controlType !== controlType ? values.controlType : undefined,
      sliderMin: values.sliderMin !== sliderMin ? values.sliderMin : undefined,
      sliderMax: values.sliderMax !== sliderMax ? values.sliderMax : undefined,
      buttonMessage:
        values.buttonMessage !== buttonMessage
          ? values.buttonMessage
          : undefined,
      buttonMessageFormat:
        values.buttonMessageFormat !== buttonMessageFormat
          ? values.buttonMessageFormat
          : undefined,
      toggleButtonMessageOn:
        values.toggleButtonMessageOn !== toggleButtonMessageOn
          ? values.toggleButtonMessageOn
          : undefined,
      toggleButtonMessageOff:
        values.toggleButtonMessageOff !== toggleButtonMessageOff
          ? values.toggleButtonMessageOff
          : undefined,
    };
    let res;
    if (isUpdate) {
      res = await updateControl(formData, session.user.token);
    } else {
      res = await newControl(formData, session.user.token);
    }
    if (res.ok) {
      router.push("/devices");
    } else {
      try {
        const body = await res.json();
        setGlobalError(body.errorMessage);
      } catch (e) {
        setGlobalError("Server error please try again later");
      }
    }
  }

  return (
    <div>
      <h3 className="text-red-500">{globalError}</h3>
      <Formik
        initialValues={{
          name: isUpdate ? name : "",
          deviceId: isUpdate ? deviceId : "-1",
          attributeId: isUpdate ? attributeId : "-1",
          controlType: isUpdate ? controlType : "BUTTON",
          sliderMin: isUpdate ? sliderMin : 0,
          sliderMax: isUpdate ? sliderMax : 100,
          buttonMessage: isUpdate ? buttonMessage : "",
          buttonMessageFormat: isUpdate ? buttonMessageFormat : "STRING",
          toggleButtonMessageOn: isUpdate ? toggleButtonMessageOn : "",
          toggleButtonMessageOff: isUpdate ? toggleButtonMessageOff : "",
        }}
        className="space-y-4 md:space-y-6"
        enableReinitialize={true}
        onSubmit={onSubmitForm}
        validationSchema={ControlSchema}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <fieldset>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Control name
                <ErrorMessage
                  name="name"
                  className="text-red-500 float-right"
                  component={"span"}
                />
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </fieldset>
            <fieldset>
              <label
                htmlFor="deviceId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select device
                <ErrorMessage
                  name="deviceId"
                  className="text-red-500 float-right"
                  component={"span"}
                />
              </label>
              <Field
                onChange={(e) => {
                  updateAttributes(e.target.value);
                  setFieldValue("deviceId", e.target.value);
                }}
                as="select"
                name="deviceId"
                id="deviceId"
                placeholder="Select device"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {devicesSelectOptions.length > 0 ? (
                  <>
                    <option key="-1" value="-1">
                      Select a device
                    </option>
                    {devicesSelectOptions}
                  </>
                ) : (
                  <option key="-1" value="-1">
                    Loading...
                  </option>
                )}
              </Field>
            </fieldset>
            <fieldset>
              <label
                htmlFor="attributeId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select attribute
                <ErrorMessage
                  name="attributeId"
                  className="text-red-500 float-right"
                  component={"span"}
                />
              </label>
              <Field
                as="select"
                name="attributeId"
                id="attributeId"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {attributeSelectOptions ? (
                  <>
                    <option key="-1" value="-1">
                      Select a attribute
                    </option>
                    {attributeSelectOptions}
                  </>
                ) : (
                  <option key="-1" value="-1">
                    Select a device first
                  </option>
                )}
              </Field>
            </fieldset>
            <fieldset>
              <label
                htmlFor="controlType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select control type
                <ErrorMessage
                  name="controlType"
                  className="text-red-500 float-right"
                  component={"span"}
                />
              </label>
              <Field
                as="select"
                name="controlType"
                id="controlType"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option key={1} value={"SLIDER"}>
                  Slider
                </option>
                <option key={2} value={"BUTTON"}>
                  Button
                </option>
                <option key={2} value={"TOGGLE"}>
                  Toggle Button
                </option>
              </Field>
            </fieldset>
            {values.controlType === "SLIDER" ? (
              <>
                <fieldset>
                  <label
                    htmlFor="sliderMin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Slider min
                    <ErrorMessage
                      name="sliderMin"
                      className="text-red-500 float-right"
                      component={"span"}
                    />
                  </label>
                  <Field
                    type="number"
                    name="sliderMin"
                    id="sliderMin"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </fieldset>
                <fieldset>
                  <label
                    htmlFor="sliderMax"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Slider max
                    <ErrorMessage
                      name="sliderMax"
                      className="text-red-500 float-right"
                      component={"span"}
                    />
                  </label>
                  <Field
                    type="number"
                    name="sliderMax"
                    id="sliderMax"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </fieldset>
              </>
            ) : (
              <></>
            )}
            {values.controlType === "BUTTON" ? (
              <>
                <fieldset>
                  <label
                    htmlFor="buttonMessage"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Button message when clicked
                    <ErrorMessage
                      name="buttonMessage"
                      className="text-red-500 float-right"
                      component={"span"}
                    />
                  </label>
                  <Field
                    type="text"
                    name="buttonMessage"
                    id="buttonMessage"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </fieldset>
                <fieldset>
                  <label
                    htmlFor="buttonMessageFormat"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select button message format
                    <ErrorMessage
                      name="buttonMessageFormat"
                      className="text-red-500 float-right"
                      component={"span"}
                    />
                  </label>
                  <Field
                    as="select"
                    name="buttonMessageFormat"
                    id="buttonMessageFormat"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option key={1} value={"STRING"}>
                      String
                    </option>
                    <option key={2} value={"NUMBER"}>
                      Number
                    </option>
                  </Field>
                </fieldset>
              </>
            ) : (
              <></>
            )}
            {values.controlType === "TOGGLE" ? (
              <fieldset>
                <label
                  htmlFor="buttonMessage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Button message when clicked
                  <ErrorMessage
                    name="buttonMessage"
                    className="text-red-500 float-right"
                    component={"span"}
                  />
                </label>
                <Field
                  type="text"
                  name="buttonMessage"
                  id="buttonMessage"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </fieldset>
            ) : (
              <></>
            )}
            <button type="submit" className="btn w-full my-6">
              Create attribute
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              <a
                onClick={() => {
                  router.back();
                }}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
              >
                Back
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ControlForm;
