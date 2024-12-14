"use client";
import React, { useState, useEffect } from "react";
import {
  getCachedImage,
  fetchUnsplashImage,
  cacheImage,
} from "@/app/_actions/images";
import Image from "next/image";

export default function CountryImage({ country }: { country: string }) {
  const [image, setImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      setIsImageLoading(true);
      const cachedImageUrl = await getCachedImage(country);
      console.log("cachedImageUrl", cachedImageUrl);
      if (!cachedImageUrl) {
        const unsplashImageUrl = await fetchUnsplashImage(country);
        if (unsplashImageUrl) {
          await cacheImage(country, unsplashImageUrl);
        }
        setImage(unsplashImageUrl);
      } else {
        setImage(cachedImageUrl);
      }
      setIsImageLoading(false);
    };
    fetchImage().catch((error) => console.log(error));
  }, [country]);

  if (isImageLoading)
    return (
      <div className="w-full h-full bg-white bg-opacity-30 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );

  return (
    <>
      {image ? (
        <Image src={image} alt={`Image of ${country}`} fill={true} />
      ) : (
        <p>No image available</p>
      )}
    </>
  );
}
