"use client";

import { z } from "zod";

export const SafetyFormSchema = z.object({
  forum: z.string().refine((val) => ForumTypes.includes(val)),
  capture: z.string(),
  description: z.string(),
  location: z.string().refine((val) => LocationTypes.includes(val)),
  phenomena: z.string().refine((val) => PhenomenaTypes.includes(val)),
  hazardCategory: z.string().refine((val) => HazardCategoryTypes.includes(val)),
  hazard: z.string().refine((val) => {
    const values = Object.values(HazardTypes);
    return values.flat().includes(val);
  }),
  riskLevel: z.string().refine((val) => RiskLevelTypes.includes(val)),
});

export const ForumTypes: string[] = [
  "ISO External Audit",
  "ISO Internal Audit",
  "External Safety Audit",
  "3rd Eye Audit",
  "Top Management Audit",
  "Plant Safety Audit",
  "Shop Safety Audit",
  "Walk Through Inspection",
] as const;

export const LocationTypes: string[] = [
  "CKD",
  "Parts control",
  "Frame Line",
  "Tank Line",
  "ACED Paint",
  "ABS Paint",
  "Unit & Kit",
  "Assembly A-BD",
  "Assembly A-EG",
  "Assembly B-BD",
  "Assembly B-EG",
  "Logistics",
  "SKD",
  "Aluminum M/c",
  "Casting",
  "FE M/c",
] as const;

export const PhenomenaTypes: string[] = [
  "Unsafe Condition",
  "Unsafe Act",
  "Near Miss",
  "Fire",
] as const;

export const HazardCategoryTypes: string[] = [
  "Physical Hazard",
  "Electrical Hazard",
  "Chemical Hazard",
  "Ergonomical Hazard",
  "Biological Hazard",
] as const;

export const HazardTypes: { [key: string]: string[] } = {
  "Physical Hazard": [
    "Sharp Edge",
    "Pinch Point",
    "Noise",
    "Fire & Explosive",
    "Striking against",
    "Struck by",
    "Slip/Trip/Fall",
    "Caught in/on/between",
    "Thermal Stress",
    "Radiation",
  ],
  "Electrical Hazard": [
    "Insulation not OK",
    "Cable Routing improper",
    "Fittings Broken",
    "Earthing Not Ok",
  ],
  "Chemical Hazard": ["Toxic", "Allergic", "Flammable"],
  "Ergonomical Hazard": [
    "Repetitive Movement",
    "Forceful Excretion",
    "Awkward Posture",
    "Vibration",
    "Work Area Design",
    "Poor Design of tool",
  ],
  "Biological Hazard": ["Reptile Bites"],
} as const;

export const RiskLevelTypes: string[] = [
  "Serious Problem - 5",
  "Major Problem - 4",
  "Moderate Problem - 3",
  "Minor Problem - 2",
  "Negligible Problem - 1",
] as const;