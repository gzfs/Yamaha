"use client";

import { useSession, getSession } from "next-auth/react";
import Heading from "./_components/Heading";
import Login from "./_components/Login";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();

  useEffect(() => {
    if (status == "authenticated") {
      window.location.href = "/report";
    }
  });

  return (
    <main className="px-10 grid place-items-center">
      <div className="w-full">
        <Heading
          headingDescription="AWARE, ASSESS, ACTION & AFFIRM FOR STRONG SAFE GEMBA"
          headingName="SAFE GEMBA"
        />
        <Login />
      </div>
    </main>
  );
}
