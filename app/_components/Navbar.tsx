"use client";

import { MaterialSymbolsLists } from "@/components/icons";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data, status } = useSession();

  return (
    <nav className="py-5">
      <div className="flex w-full justify-between">
        <Image src="/images/550574.png" alt="Logo" width={200} height={100} />
        <Image
          src="/images/about-us.png"
          alt="Call of the Blue"
          className="scale-50"
          width={200}
          height={100}
        />
      </div>
      {data?.user && (
        <div className="px-5 flex justify-between font-Outfit text-sm">
          <Link
            href={"/entries"}
            className="p-3 bg-white text-[#1f3f9b] rounded-2xl px-5"
          >
            Entries
          </Link>
          <button
            className="p-3 bg-white text-[#1f3f9b] rounded-2xl px-5"
            onClick={() => {
              signOut({
                redirect: true,
                callbackUrl: "/",
              });
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
