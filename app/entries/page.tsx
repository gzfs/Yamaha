"use client";

import { Report } from "@prisma/client";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Entries() {
  const { data, status } = useSession();

  const [userEntries, setUserEntries] = useState<Report[]>();

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }

    if (data?.user?.email)
      fetch("/api/report/get", {
        method: "POST",
        body: JSON.stringify({
          userEIN: data?.user?.email,
        }),
      })
        .then((reportRes) => {
          return reportRes.json();
        })
        .then((reportJson) => {
          setUserEntries(reportJson);
          return reportJson;
        });
  }, [data?.user?.email, status]);
  return (
    <main className="px-5 md:px-10">
      <button
        className="p-3 bg-white text-[#1f3f9b] text-sm font-Outfit rounded-2xl mb-4"
        onClick={() => {
          const workbookName = `Hello_${data?.user?.email}_${Date.now()}.xlsx`;

          if (userEntries?.length != 0) {
            const Excel = require("exceljs");

            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet("Sheet1");
            worksheet.columns = [
              { header: "ID", key: "ID", width: 50 },
              { header: "EIN", key: "userEIN", width: 50 },
              { header: "Forum", key: "Forum" },
              { header: "Location", key: "Location", width: 50 },
              { header: "Phenomena", key: "Phenomena", width: 50 },
              { header: "Hazard Category", key: "HazardCategory", width: 50 },
              { header: "Hazard", key: "Hazard", width: 50 },
              { header: "Description", key: "Description", width: 50 },
              { header: "Image", key: "Image", width: 50 },
            ];
            // insert from the second row onwards
            worksheet.insertRows(userEntries?.length, userEntries);
            workbook.xlsx.writeBuffer().then(function (data: Blob) {
              const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              });

              saveAs(blob, workbookName);
            });
          }
        }}
      >
        Export to Excel
      </button>
      <div className="grid md:grid-cols-2 gap-4">
        {userEntries &&
          userEntries.map((userEntry) => {
            return (
              <div
                className="flex p-3 border-2 border-white rounded-3xl text-white"
                key={userEntry.ID}
              >
                <img
                  src={userEntry.Image}
                  alt={userEntry.ID}
                  width={150}
                  height={50}
                  className="rounded-2xl w-[100px] sm:w-[150px]"
                />
                <div className="p-3 grid gap-y-2 text-sm">
                  <p className="flex flex-col">
                    <span className="text-xs">Forum</span>
                    <span className="text-sm">{userEntry.Forum}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">Description</span>
                    <span className="text-sm">{userEntry.Description}</span>
                  </p>
                  <div className="flex text-sm">
                    <p>{userEntry.HazardCategory}</p>
                    <p className="ml-3">{userEntry.Hazard}</p>
                  </div>
                  <p>{userEntry.Location}</p>
                  <p>{userEntry.Phenomena}</p>
                  <p>{userEntry.RiskLevel}</p>
                  <p></p>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
