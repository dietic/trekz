import requests
from supabase import create_client, Client
from datetime import datetime, timezone

SUPABASE_URL="https://mcqyuihsxmafmhhdropz.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jcXl1aWhzeG1hZm1oaGRyb3B6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTA1MzQ4OCwiZXhwIjoyMDQ0NjI5NDg4fQ.gqtVInVSMakQ1ZO0cl_YvINj1YAh91YRASOPSS1ceKc"

supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

def fetch_countries():
    print("Fetching countries from CountriesAPI")
    response = requests.get("https://countriesnow.space/api/v0.1/countries")

    if response.status_code == 200:
        data = response.json()
        return data["data"]
    else:
        raise Exception(f"Failed to fetch data: {response.status_code}")

def update_countries_in_db(countries):
    total_countries = len(countries)
    for i, country in enumerate(countries, start=1):
        iso2 = country["iso2"]
        iso3 = country["iso3"]
        name = country["country"]
        updated_at = datetime.now(timezone.utc).isoformat()

        print(f"[{i}/{total_countries}] Upserting country: {name} ({iso2})...", end="\r", flush=True)
        
        supabase.table("cached_countries").upsert({
            "iso2": iso2,
            "iso3": iso3,
            "name": name,
            "updated_at": updated_at
        }).execute()

def main():
    try:
        countries = fetch_countries()
        update_countries_in_db(countries)
    except Exception as e:
        print(e)

if __name__ == "__main__":
    main()
