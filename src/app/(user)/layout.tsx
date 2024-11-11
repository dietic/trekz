import { AuthProvider } from "../_utils/context/auth";
import "./style.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="waves-background w-full h-full relative">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
