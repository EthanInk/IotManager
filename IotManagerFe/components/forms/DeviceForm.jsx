"use client";

import { newDevice, updateDevice } from "@/fetchData/frontendToBackend/device";
import NewDeviceSchema from "@/schema/NewDeviceSchema";
import UpdateDeviceSchema from "@/schema/UpdateDeviceSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const DeviceForm = ({ isUpdate = false, id, username, deviceName }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [globalError, setGlobalError] = useState("");

  if (status === "unauthenticated") {
    redirect("/");
  }

  async function onSubmitForm(values) {
    const formData = {
      id: isUpdate ? id : undefined,
      username: values.username !== username ? values.username : undefined,
      password: values.password !== "" ? values.password : undefined,
      deviceName:
        values.deviceName !== username ? values.deviceName : undefined,
    };
    if (isUpdate) {
      res = await updateDevice(formData, session.user.token);
    } else {
      res = await newDevice(formData, session.user.token);
    }
    if (res.ok) {
      redirectInAFunctionBecauseItIsRandomlyThrowingErrors("/devices");
    } else {
      const body = await res.json();
      setGlobalError(body.errorMessage);
    }
  }

  function redirectInAFunctionBecauseItIsRandomlyThrowingErrors(path) {
    router.push(path);
  }

  return (
    <div>
      <h3 className="text-red-500">{globalError}</h3>
      <Formik
        initialValues={{
          username: isUpdate ? username : "",
          password: "",
          confirmPassword: "",
          deviceName: isUpdate ? deviceName : "",
        }}
        className="space-y-4 md:space-y-6"
        enableReinitialize={true}
        onSubmit={onSubmitForm}
        validationSchema={isUpdate ? UpdateDeviceSchema : NewDeviceSchema}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <fieldset>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Device login username
                <ErrorMessage
                  name="username"
                  className="text-red-500 float-right"
                  component={"span"}
                />
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                placeholder={username}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </fieldset>
            <fieldset>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Device login password
                <ErrorMessage
                  name="password"
                  className="text-red-500 float-right"
                  component={"span"}
                />
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </fieldset>
            <fieldset>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm device login password
                <ErrorMessage
                  name="confirmPassword"
                  className="text-red-500 float-right"
                  component={"span"}
                />
              </label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </fieldset>
            <fieldset>
              <label
                htmlFor="deviceName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Device display name
                <ErrorMessage
                  name="deviceName"
                  className="text-red-500 float-right"
                  component={"span"}
                />
              </label>
              <Field
                type="text"
                name="deviceName"
                id="deviceName"
                placeholder={deviceName}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </fieldset>
            <button type="submit" className="btn w-full my-6">
              Create device
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

export default DeviceForm;
