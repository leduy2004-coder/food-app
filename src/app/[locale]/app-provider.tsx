"use client";
import { isClient } from "@/lib/http";
import { UserProfileType } from "@/schemaValidations/auth.schema";
import { createContext, useCallback, useContext, useState } from "react";

const AppContext = createContext<{
  user: UserProfileType | null;
  setUser: (user: UserProfileType | null) => void;
  isAuthenticated: boolean;
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<UserProfileType | null>(() => {
    if (isClient()) {
      const _user = localStorage.getItem("user");
      return _user ? JSON.parse(_user) : null;
    }
    return null;
  });
  const isAuthenticated = Boolean(user);
  const setUser = useCallback(
    (user: UserProfileType | null) => {
      setUserState(user);
      localStorage.setItem("user", JSON.stringify(user));
    },
    [setUserState]
  );

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
