"use client";
import { usePathname } from "next/navigation";

interface NavbarItem {
  href: string;
  icon: string;
  label: string;
}
const navbar: NavbarItem[] = [
  { href: "/trips", icon: "flight", label: "Viajes" },
  { href: "/home", icon: "home", label: "Inicio" },
  { href: "/settings", icon: "settings", label: "Configuración" },
];
export default function Navbar() {
  const pathname = usePathname();
  const isItemActive = (path: string) => pathname.startsWith(path);
  return (
    <nav className="bg-white flex w-full">
      {navbar &&
        navbar.map((item: NavbarItem, idx: number) => (
          <a
            key={idx}
            href={item.href}
            aria-current={isItemActive(item.href) ? "page" : undefined}
            className={`flex flex-col flex-1 py-5 justify-center items-center ${isItemActive(item.href) ? "bg-blue text-white" : ""}`}
          >
            <span className="material-icons-outlined text-base mb-4">
              {item.icon}
            </span>
            <span className="font-NAM">{item.label}</span>
          </a>
        ))}
    </nav>
  );
}
