"use client";

import {
  ForumTypes,
  HazardCategoryTypes,
  HazardTypes,
  LocationTypes,
  PhenomenaTypes,
  RiskLevelTypes,
  SafetyFormSchema,
} from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComboBox } from "./ComboBox";
import { SimpleIconsYamahacorporation } from "@/components/icons";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function SafetyForm({ userEin }: { userEin: string }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof SafetyFormSchema>>({
    resolver: zodResolver(SafetyFormSchema),
  });

  const { toast } = useToast();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SafetyFormSchema>) {
    if (uploadLink.length != 0) {
      fetch("/api/report", {
        method: "POST",
        body: JSON.stringify({
          forum: values.forum,
          description: values.description,
          capture: uploadLink,
          location: values.location,
          phenomena: values.phenomena,
          hazardCategory: values.hazardCategory,
          hazard: values.hazard,
          riskLevel: values.riskLevel,
          user: userEin,
        }),
      }).then((resp) => {});
    }
  }

  const [uploadImage, setUploadImage]: [
    uploadImage: File | undefined,
    setUploadImage: Dispatch<SetStateAction<File | undefined>>
  ] = useState();

  const [uploadLink, setUploadLink] = useState("");

  return (
    <Form {...form}>
      <form
        className="gap-y-4 grid p-5 border-2 rounded-3xl font-Outfit mb-10"
        onSubmit={(e) => {
          form.handleSubmit(onSubmit);
          e.preventDefault();
        }}
      >
        <FormLabel className="font-bold text-5xl flex text-white justify-center items-center gap-x-2">
          <SimpleIconsYamahacorporation />
          <p className="font-Bebas">RISK REPORT</p>
        </FormLabel>
        <ComboBox fname={"forum"} args={ForumTypes} form={form} />

        <ComboBox fname={"location"} args={LocationTypes} form={form} />
        <ComboBox fname={"phenomena"} args={PhenomenaTypes} form={form} />
        <ComboBox
          fname={"hazardCategory"}
          args={HazardCategoryTypes}
          form={form}
        />
        {HazardCategoryTypes.includes(form.watch().hazardCategory) ? (
          <ComboBox
            fname={"hazard"}
            args={HazardTypes[form.watch().hazardCategory]}
            form={form}
          />
        ) : (
          <div className="w-full border rounded-md p-2 text-white">
            Select a hazard category
          </div>
        )}
        <ComboBox fname={"riskLevel"} args={RiskLevelTypes} form={form} />
        <FormField
          name="description"
          render={({ field, fieldState, formState }) => (
            <FormItem className="">
              <FormLabel className="text-white">Description</FormLabel>
              <Textarea
                placeholder="Insert any information which is relevant"
                {...field}
              />
            </FormItem>
          )}
        />
        <FormField
          name={"capture"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Photo</FormLabel>
              <Input
                className="text-inherit"
                type="file"
                onChange={async (e) => {
                  setUploadImage(
                    e.target.files ? e.target.files[0] : undefined
                  );
                  const fileReader = new FileReader();
                  if (uploadImage)
                    fileReader.readAsDataURL(uploadImage as File);
                  fileReader.onload = async () => {
                    const fileResult = fileReader.result;
                    if (typeof fileResult === "string") {
                      const imageBase64 = fileResult.split(",")[1];
                      if (imageBase64) {
                        const addedSliderImage = await fetch("/api/image", {
                          headers: {
                            "Content-Type": "application/json",
                          },
                          method: "POST",
                          body: JSON.stringify({
                            uploadImage: imageBase64,
                          }),
                          next: {
                            revalidate: 1,
                          },
                        });

                        toast({
                          title: "Uploading the Image",
                        });

                        const respBody = await addedSliderImage.json();

                        setUploadLink(respBody);
                        toast({
                          title: "Uploaded the Image",
                        });
                      }
                    }
                  };
                }}
              />
            </FormItem>
          )}
        />
        <Button
          className="bg-black bg-opacity-50"
          onClick={(e) => {
            onSubmit(form.getValues());
            e.preventDefault();
          }}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
