"use client";

import { signOut } from "next-auth/react";
import React from "react";

const LogoutLink = () => {
  return <a onClick={() => signOut()}>Logout</a>;
};

export default LogoutLink;
