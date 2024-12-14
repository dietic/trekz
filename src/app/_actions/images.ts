"use server";
import axios from "axios";
import { createClient } from "@/app/_utils/supabase/server";

const supabase = await createClient();

export const getCachedImage = async (country: string) => {
  const { data, error } = await supabase
    .from("cached_images")
    .select("image_url")
    .eq("country", country)
    .single();
  return data?.image_url || null;
};

export const fetchUnsplashImage = async (country: string) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      orientation: "landscape",
      query: `${country} landscape`,
      client_id: process.env.UNSPLASH_API_KEY,
      per_page: 1,
    },
  });

  if (response.data.results.length === 0) {
    throw new Error("No images found for the specified country.");
  }

  return response.data.results[0]?.urls?.regular || null;
};

export const cacheImage = async (country: string, imageUrl: string) => {
  const { error } = await supabase
    .from("cached_images")
    .insert([{ country, image_url: imageUrl, updated_at: new Date() }]);
  if (error) throw new Error("Error caching image.");
};
