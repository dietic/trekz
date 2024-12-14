import { NextResponse } from "next/server";
import { getCountries } from "../../_actions/geo";

export async function GET() {
  try {
    const countries = await getCountries();
    const mappedCountries = countries?.map((country) => ({
      name: country.name,
      value: country.iso2,
    }));
    return NextResponse.json(mappedCountries, { status: 200 });
  } catch (error) {
    console.log(`error hereeeeeeeeeeeeeeeeeee --->${error}`);
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 },
    );
  }
}
