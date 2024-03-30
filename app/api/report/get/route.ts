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

  return NextResponse.json(foundEntries);
}
