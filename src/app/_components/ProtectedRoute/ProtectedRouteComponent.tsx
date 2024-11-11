import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../_utils/context/auth";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (profile && !profile.onboarded) {
        router.push("/onboarding");
      }
    }
  }, [user, profile, loading, router]);

  if (loading || !user || (profile && !profile.onboarded)) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
