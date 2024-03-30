import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(postReq: NextRequest){
    const postJson = await postReq.json();
    console.log(postJson);

    const createReport = await prisma.report.create({
        data: {
            Description: postJson.description,
            Forum: postJson.forum,
            Hazard: postJson.hazard,
            HazardCategory: postJson.hazardCategory,
            Image: postJson.capture,
            Location: postJson.location,
            Phenomena: postJson.phenomena,
            RiskLevel: postJson.riskLevel,
            userEIN: postJson.user
        }
    })
    
    if(createReport){
        return NextResponse.json({
            message: "Record Successfully Created"
        })
    } else {
        return NextResponse.json({
            message: "Error Occured"
        })
    }

    
}