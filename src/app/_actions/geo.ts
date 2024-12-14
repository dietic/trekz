import { createClient } from "../_utils/supabase/server";
export async function getCountries() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("cached_countries")
      .select("name, iso2");
    if (error) {
      throw new Error("Failed to fetch countries");
    }
    return data;
  } catch (error) { }
}
