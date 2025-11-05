import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/components/Loading";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user on page refresh
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // Login function
  async function login(email, password) {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data.user;
  };

  // Logout function
  async function logout() {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
