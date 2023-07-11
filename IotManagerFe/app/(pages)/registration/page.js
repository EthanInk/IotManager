"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import RegisterSchema from "@/schema/RegisterSchema";
import { register } from "@/fetchData/frontendToBackend/auth";
import { redirect } from 'next/navigation';

const Registration = () => {
  const { status } = useSession()
  if (status === "authenticated") {
    redirect('/');
  }

  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);
  const [globalError, setGlobalError] = useState("");

  async function onSubmitForm(values) {
    const res = await register({
      username: values.email,
      password: values.password,
      topicRoot: values.topicRoot,
    });
    if (res.ok) {
      setRegisteredSuccessfully(true);
    } else {
      const body = await res.json();
      setGlobalError(body.errorMessage);
    }
  }
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:py-12 lg:py-12">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            width={40}
            height={40}
          />
          IOT manager
        </a>

        {registeredSuccessfully ? (
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Successfully regestered. Please proceed to loggin in.{" "}
            <a
              onClick={() => signIn()}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
            >
              Login here.
            </a>
          </p>
        ) : (
          <div className="card w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <p className="text-red-500">
                {globalError ? `Error: ${globalError}` : ""}
              </p>
              <Formik
                initialValues={{ email: "", password: "", confirmPassword: "", topicRoot: "" }}
                className="space-y-4 md:space-y-6"
                enableReinitialize={true}
                onSubmit={onSubmitForm}
                validationSchema={RegisterSchema}
                validateOnChange={true}
                validateOnBlur={true}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                  <fieldset>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                      <ErrorMessage
                        name="email"
                        className="text-red-500 float-right"
                        component={"span"}
                      />
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@company.com"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </fieldset>
                    <fieldset>
                      <label
                        htmlFor="topicRoot"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        A global unique topic that is used as the root for all your channels.
                        <ErrorMessage
                          name="topicRoot"
                          className="text-red-500 float-right"
                          component={"span"}
                        />
                      </label>
                      <Field
                        type="topicRoot"
                        name="topicRoot"
                        id="topicRoot"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </fieldset>
                    <fieldset>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
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
                        Confirm password
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
                    <button type="submit" className="btn w-full my-6">
                      Create an account
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <a
                        onClick={() => signIn()}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                      >
                        Login here
                      </a>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Registration;
