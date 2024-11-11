import "./style.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="waves-background w-full h-full relative">{children}</div>
  );
}
