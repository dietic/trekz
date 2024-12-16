"use client";
import Input from "@/app/_components/input/inputComponent";
import Dropdown from "@/app/_components/select/selectComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z, ZodType } from "zod";

export default function NewTripForm() {
  type TripGeneralInfo = {
    title: string;
    country: string;
    city: string;
    startDate: string;
    endDate: string;
    description: string;
    status: "ongoing" | "cancelled" | "finished";
    flightId: number;
    housingId: number;
    userId: number;
  };

  const generalInfoSchema: ZodType<TripGeneralInfo> = z.object({
    title: z.string(),
    country: z.string(),
    city: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
    status: z.enum(["ongoing", "cancelled", "finished"]),
    flightId: z.number(),
    housingId: z.number(),
    userId: z.number(),
  });

  type GeneralInfoSchema = z.infer<typeof generalInfoSchema>;
  const form = useForm<GeneralInfoSchema>({
    mode: "onSubmit",
    resolver: zodResolver(generalInfoSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR<{ name: string; value: string }[]>(
    "/api/countries",
    fetcher,
  );
  const countries = data || [];
  const ons = async (data: any) => {
    try {
      console.log("form submitted");
    } catch (error) {
      console.log("sssssssssrror");
    }
  };
  return (
    <form onSubmit={handleSubmit(ons)}>
      <label className="text-blue text-base">Dale un título</label>
      <Input
        variant="secondary"
        type="text"
        name="title"
        fullWidth
        error={errors.title}
        register={register}
        placeholder="Título"
      ></Input>
      <h3 className="text-base text-blue">Cuéntanos a donde</h3>
      {countries && (
        <Dropdown
          name="country"
          placeholder="Selecciona un pais"
          options={countries}
          register={register}
        />
      )}
      <input value="submit" type="submit" />
    </form>
  );
}
