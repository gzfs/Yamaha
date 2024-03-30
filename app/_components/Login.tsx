"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [userPass, setUserPass] = useState("");
  const [userEIN, setUserEIN] = useState("");

  return (
    <div className="grid gap-y-4 font-Outfit max-w-[360px] m-auto">
      <div className="relative">
        <p className="text-xs text-white top-0 ml-4 px-1 left-0 bg-[#1f3f9b] absolute">
          EIN:
        </p>
        <input
          className="bg-transparent mt-2 border-white border-2 w-full px-5 py-3 rounded-3xl outline-none text-white"
          onChange={(eV) => {
            setUserEIN(eV.target.value);
          }}
        ></input>
      </div>
      <div className="relative">
        <p className="text-xs text-white top-0 ml-4 px-1 left-0 bg-[#1f3f9b] absolute">
          Password:
        </p>
        <input
          className="bg-transparent mt-2 border-white border-2 w-full px-5 py-3 outline-none rounded-3xl text-white"
          onChange={(eV) => {
            setUserPass(eV.target.value);
          }}
        ></input>
      </div>
      <button
        onClick={async () => {
          await signIn("credentials", {
            ein: userEIN,
            password: userPass,
            redirect: true,
            callbackUrl: "/report",
          });
        }}
        className="bg-white text-[#1f3f9b] w-fit py-3 mt-2 px-10 text-sm place-self-center rounded-3xl"
      >
        Submit
      </button>
    </div>
  );
}
