"use client";

import {
  getDevices,
  newAttribute,
  updateAttribute,
} from "@/fetchData/frontendToBackend/device";
import NewControlSchema from "@/schema/AttributeSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const AttributeForm = ({
  isUpdate,
  id,
  deviceId,
  name,
  attributeValueType,
  attributeValue,
  updateAttributeChannel,
  confirmAttributeChannel,
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [globalError, setGlobalError] = useState("");
  const [devicesSelectOptions, setDevicesSelectOptions] = useState("");

  if (status === "unauthenticated") {
    redirect("/");
  }

  useEffect(() => {
    updateDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function updateDevices() {
    if (status === "loading") return;
    const res = await getDevices(session.user.token);
    if (!res.ok) return;
    const body = await res.json();
    let deviceOptions = body.map((item) => {
      console.log(item.id);
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
    setDevicesSelectOptions(deviceOptions);
  }

  async function onSubmitForm(values) {
    const formData = {
      id: isUpdate ? id : undefined,
      name: values.name !== name ? values.name : undefined,
      deviceId: values.deviceId !== deviceId ? values.deviceId : undefined,
      attributeValue:
        values.attributeValue !== attributeValue
          ? values.attributeValue
          : undefined,
      attributeValueType:
        values.attributeValueType !== attributeValueType
          ? values.attributeValueType
          : undefined,
      updateAttributeChannel:
        values.updateAttributeChannel !== updateAttributeChannel
          ? values.updateAttributeChannel
          : undefined,
      confirmAttributeChannel:
        values.confirmAttributeChannel !== confirmAttributeChannel
          ? values.confirmAttributeChannel
          : undefined,
    };
    if (isUpdate) {
      res = await updateAttribute(formData, session.user.token);
    } else {
      res = await newAttribute(formData, session.user.token);
    }
    if (res.ok) {
      router.push("/devices");
    } else {
      const body = await res.json();
      setGlobalError(body.errorMessage);
    }
  }

  return (
    <div>
      <h3 className="text-red-500">{globalError}</h3>
      <Formik
        initialValues={{
          name: isUpdate ? name : "",
          deviceId: isUpdate ? deviceId : "-1",
          attributeValue: isUpdate ? attributeValue : "",
          attributeValueType: isUpdate ? attributeValueType : "STRING",
          updateAttributeChannel: isUpdate ? updateAttributeChannel : "",
          confirmAttributeChannel: isUpdate ? confirmAttributeChannel : "",
        }}
        className="space-y-4 md:space-y-6"
        enableReinitialize={true}
        onSubmit={onSubmitForm}
        validationSchema={NewControlSchema}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <fieldset>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Attribute name
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
                as="select"
                name="deviceId"
                id="deviceId"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {devicesSelectOptions ? (
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
                htmlFor="attributeValue"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                The starting attribute value
                <ErrorMessage
                  name="attributeValue"
                  className="text-red-500 float-right"
                  component={"span"}
                />
              </label>
              <Field
                type="text"
                name="attributeValue"
                id="attributeValue"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </fieldset>
            <fieldset>
              <label
                htmlFor="attributeValueType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select attribute format
                <ErrorMessage
                  name="attributeValueType"
                  className="text-red-500 float-right"
                  component={"span"}
                />
              </label>
              <Field
                as="select"
                name="attributeValueType"
                id="attributeValueType"
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
            <fieldset>
              <label
                htmlFor="updateAttributeChannel"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Update value MQTT channel name
                <ErrorMessage
                  name="updateAttributeChannel"
                  className="text-red-500 float-right"
                  component={"span"}
                />
              </label>
              <Field
                type="text"
                name="updateAttributeChannel"
                id="updateAttributeChannel"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </fieldset>
            <fieldset>
              <label
                htmlFor="confirmAttributeChannel"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm value MQTT channel name
                <ErrorMessage
                  name="confirmAttributeChannel"
                  className="text-red-500 float-right"
                  component={"span"}
                />
              </label>
              <Field
                type="text"
                name="confirmAttributeChannel"
                id="confirmAttributeChannel"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </fieldset>
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

export default AttributeForm;
