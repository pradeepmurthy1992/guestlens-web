import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

const AuthContext = createContext(undefined);

// Deliberately no hash/route baked in here. Supabase appends the session
// (as ?code=... or #access_token=...) to whatever URL we hand it - if that
// URL already has a "#/route" in it (as HashRouter routes do), the session
// data lands inside our hash where the client never looks for it, and the
// login silently fails. Redirecting to the bare origin lets Supabase's own
// detection pick it up cleanly; we then navigate to /dashboard ourselves
// once a real sign-in event fires.
function authRedirectUrl() {
  return `${window.location.origin}${import.meta.env.BASE_URL}`;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      if (event === "SIGNED_IN") {
        navigate("/dashboard");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signInWithEmail: (email) =>
      supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: authRedirectUrl() },
      }),
    signInWithGoogle: () =>
      supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: authRedirectUrl() },
      }),
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
