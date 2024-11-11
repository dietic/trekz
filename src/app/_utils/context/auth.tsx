"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { createClient } from "../supabase/client";

const supabase = createClient();

type AuthContextType = {
  user: any;
  profile: UserProfile | null;
  loading: boolean;
  updateProfile: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

type UserProfile = {
  id: string;
  onboarded: boolean;
  onboarding_step: number;
  name: string;
  last_name: string;
  phone_number: string;
  dob: string;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchUser = async (): Promise<any> => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return null;
      }
      return user;
    } catch (error) {
      console.error("Unexpected error fetching user:", error);
      return null;
    }
  };

  const fetchUserProfile = async (
    userId: string,
  ): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }
      return data as UserProfile;
    } catch (error) {
      console.error("Unexpected error fetching user profile:", error);
      return null;
    }
  };

  const updateProfile = async (): Promise<void> => {
    if (!user) return;
    try {
      const profileData = await fetchUserProfile(user.id);
      setProfile(profileData);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const userData = await fetchUser();
      setUser(userData);
      if (userData) {
        const profileData = await fetchUserProfile(userData.id);
        setProfile(profileData);
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          initializeAuth();
        } else {
          setUser(null);
          setProfile(null);
          setLoading(false);
        }
      },
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
