import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem("token"),
  );

  const [loading, setLoading] = useState<boolean>(true);

  const login = (newToken: string) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");

    const checkToken = async () => {
      if (storedToken) {
        setToken(storedToken);
      }
      setLoading(false);
    };
    checkToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        loading,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
