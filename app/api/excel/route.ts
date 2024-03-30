import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(postReq: NextRequest) {
  let foundEntries;
  const userEIN = (await postReq.json()).userEIN;

  const getUser = await prisma.user.findFirst({
    where: {
      EIN: userEIN,
    },
  });

  if (getUser?.Role == "Admin") {
    foundEntries = await prisma.report.findMany();
  } else {
    foundEntries = await prisma.report.findMany({
      where: {
        userEIN: userEIN,
      },
    });
  }

  if (foundEntries.length != 0) {
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
    worksheet.insertRows(foundEntries?.length, foundEntries);
    workbook.xlsx.writeFile(`temp/Hello_${getUser?.EIN}_${Date.now()}.xlsx`);
  }

  return NextResponse.json({
    message: "Sheesh",
  });
}
