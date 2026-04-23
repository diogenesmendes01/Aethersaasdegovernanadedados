import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type User = {
  name: string;
  email: string;
  role: string;
  company: string;
  avatarColor: string;
  firstAccessDone: boolean;
};

type AuthCtx = {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  signup: (data: { name: string; email: string; password: string; company: string }) => Promise<User>;
  update: (patch: Partial<User>) => void;
  completeFirstAccess: (patch: Partial<User>) => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "aether.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  }, [user]);

  const login: AuthCtx["login"] = async (email, password) => {
    await new Promise(r => setTimeout(r, 700));
    if (!email || password.length < 4) throw new Error("Credenciais inválidas");
    const u: User = {
      name: email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      email,
      role: "Data Protection Officer",
      company: "Aether Corp",
      avatarColor: "#22D3EE",
      firstAccessDone: true,
    };
    setUser(u);
    return u;
  };

  const signup: AuthCtx["signup"] = async (data) => {
    await new Promise(r => setTimeout(r, 800));
    const u: User = {
      name: data.name,
      email: data.email,
      role: "",
      company: data.company,
      avatarColor: "#6366F1",
      firstAccessDone: false,
    };
    setUser(u);
    return u;
  };

  const update: AuthCtx["update"] = (patch) => setUser(u => (u ? { ...u, ...patch } : u));
  const completeFirstAccess: AuthCtx["completeFirstAccess"] = (patch) =>
    setUser(u => (u ? { ...u, ...patch, firstAccessDone: true } : u));

  const logout = () => setUser(null);

  return <Ctx.Provider value={{ user, login, logout, signup, update, completeFirstAccess }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth fora do AuthProvider");
  return c;
}
