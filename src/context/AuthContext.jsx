import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

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
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/me`,
          { withCredentials: true }
        );
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
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      toast.success("Signed in successfully!");
      return res.data.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Logout function
  async function logout() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
