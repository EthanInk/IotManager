import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import LoginLink from "./LoginLink";
import LogoutLink from "./LogoutLink";

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className="sticky min-w-screen z-20 top-0 left-0 navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          IOT Manager
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {session ? (
            <>
              <li>
                <Link href={"/devices"}>My Devices</Link>
              </li>
              <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label tabIndex={0}>Add</label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 my-1 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link href={"/devices/new"}>New Device</Link>
                    </li>
                    <li>
                      <Link href={"/attributes/new"}>New Attribute</Link>
                    </li>
                    <li>
                      <Link href={"/controls/new"}>New Control</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <LogoutLink />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={"/registration"}>Register</Link>
              </li>
              <li>
                <LoginLink />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
