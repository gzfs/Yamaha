"use client";

import { SafetyForm } from "../_components/ReportForm";
import { useSession } from "next-auth/react";

export default function Report() {
  const userSession = useSession();

  return (
    <main className="max-w-[550px] mx-auto h-fit px-4 sm:px-0">
      <SafetyForm userEin={userSession.data?.user?.email as string} />
    </main>
  );
}
