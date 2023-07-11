"use client";

import { signIn } from "next-auth/react";
import React from "react";

const LoginLink = () => {
  return <a onClick={() => signIn()}>Login</a>;
};

export default LoginLink;
