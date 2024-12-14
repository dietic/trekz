import NewTripForm from "./_components/newTripForm";

export default async function NewTrip() {
  return (
    <div className="h-dvh bg-white absolute top-0 left-0 w-full pt-9">
      <div className="flex text-blue justify-between w-full px-12">
        <span className="material-icons-outlined !text-3xl !flex items-center cursor-pointer">
          arrow_circle_left
        </span>
        <h2 className="font-NAM text-5xl">TREKZ</h2>
      </div>
      <div className="px-12 pt-10">
        <h1 className="font-NAM text-2xl mb-7 text-blue">
          Comienza tu aventura
        </h1>
        <NewTripForm />
      </div>
    </div>
  );
}
