import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "./types";

type Props = {
  user?: User;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<Props | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const id = localStorage.getItem("id");

    if (username && id) {
      setUser({
        id: Number(id),
        username,
      });
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem("username", user.username);
    localStorage.setItem("id", String(user.id));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}

export default AuthProvider;


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};