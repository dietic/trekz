import Link from "next/link";

type IconProps = {
  height: number;
  width: number;
};
export default function NotFound() {
  const AlertIcon = (props: React.SVGProps<SVGSVGElement> & IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={"none"}
      {...props}
    >
      <path
        d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M11.992 16H12.001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13L12 8.99997"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return (
    <div className="w-full h-full bg-white flex justify-center items-center flex-col">
      <AlertIcon className="text-green" height={150} width={150} />
      <h1 className="text-6xl text-blue mt-5 font-NAM">Page not found!</h1>
      <Link className="text-blue mt-2 underline" href="/">
        Go back home
      </Link>
    </div>
  );
}
