import api from "@/lib/axios";
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { setToken } from "@/lib/token";
import type { USER_ROLE } from "@/constants/Users";

export type AuthUser = {
  id: string;
  email: string;
  phone: string;
  role: USER_ROLE;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  accessToken: string;
  setAccessToken: (token: string) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessTokenState] = useState("");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const setAccessToken = (token: string) => {
    setAccessTokenState(token);
    setIsAuthenticated(true);
    const decoded = jwtDecode<AuthUser & { exp: number }>(token);

    setUser({
      id: decoded.id,
      email: decoded.email,
      phone: decoded.phone,
      role: decoded.role,
    });

    setToken(token);
  };

  const tryRefreshToken = async () => {
    try {
      const res = await api.get("/refresh-token");
      setAccessToken(res.data.accessToken);
    } catch {
      setAccessTokenState("");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    tryRefreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, accessToken, setAccessToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
