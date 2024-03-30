"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ComboBox({
  fname,
  args,
  form,
}: {
  fname:
    | "capture"
    | "forum"
    | "description"
    | "location"
    | "phenomena"
    | "hazardCategory"
    | "hazard"
    | "riskLevel";
  args: string[];
  form: UseFormReturn<
    {
      capture: string;
      description: string;
      forum: string;
      location: string;
      phenomena: string;
      hazardCategory: string;
      hazard: string;
      riskLevel: string;
    },
    any,
    undefined
  >;
}) {
  return (
    <FormField
      control={form.control}
      name={fname}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className="text-sm text-white">
            {capitalizeFirstLetter(fname)}
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="border-0">
                {args.map((val, index) => (
                  <SelectItem key={index} value={val}>
                    {val}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function capitalizeFirstLetter(stringWord: string) {
  return stringWord.charAt(0).toUpperCase() + stringWord.slice(1);
}
