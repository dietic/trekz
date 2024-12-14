"use client";
import { useAuth } from "@/app/_utils/context/auth";
import bestPlace from "../../../../public/images/best_place.svg";
import Image from "next/image";
import Button from "@/app/_components/button/buttonComponent";

export default function Home() {
  const { profile } = useAuth();
  return (
    <div className="px-10 shadow- bg-white h-full rounded-xl flex flex-col justify-center items-center">
      <Image src={bestPlace} alt="Apartments icon" width="200" />
      <h1 className="font-NAM text-3xl text-blue py-5">Bienvenido a Trekz</h1>
      <p className="text-center">
        Tu aventura comienza aquí: explora destinos increíbles mientras
        mantienes tus vuelos, estancias y planes perfectamente organizados en
        una sola app.
      </p>
      <Button href="/trips/new" color="blue" className="mt-6" fullWidth>
        Comienza tu aventura
      </Button>
    </div>
  );
}
