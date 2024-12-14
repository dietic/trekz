import CountryImage from "@/app/_components/countryImage/countryImageComponent";

const dummy = [
  {
    title: "Despedida Ale",
    country: "Argentina",
  },
  {
    title: "Despedida Ale",
    country: "Peru",
  },
  {
    title: "Despedida Ale",
    country: "Alaska",
  },
];
export default async function Trips() {
  return (
    <main className="flex flex-col items-center justify-between">
      {dummy &&
        dummy.map((item: any, idx: number) => (
          <div
            key={idx}
            className="h-28 w-full rounded-xl overflow-hidden relative flex items-center justify-center mb-7 cursor-pointer"
          >
            <div className="w-full h-full px-3.5 py-2.5 bg-blue bg-opacity-50 z-10 absolute left-0 top-0 hover:bg-opacity-80">
              <div className="w-full flex justify-between items-center">
                <h3 className="font-NAM text-white">
                  {`${item.title} - ${item.country}`}
                </h3>
                <span className="material-icons-outlined text-white !text-xl cursor-pointer">
                  edit
                </span>
              </div>
            </div>
            <CountryImage country={item.country}></CountryImage>
          </div>
        ))}
    </main>
  );
}
