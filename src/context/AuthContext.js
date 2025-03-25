// context/AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to indicate loading state
  const [hasSeenWelcomePage, setHasSeenWelcomePage] = useState(false);
  const [user, setUser] = useState(null); // Store user details (e.g., username, token)
  const router = useRouter();

  console.log("isAuthenticated:", isAuthenticated, setIsAuthenticated);

  // Check if the user has seen the welcome page
  useEffect(() => {
    const token = localStorage.getItem("token");
    const hasSeenWelcomePage = localStorage.getItem("hasSeenWelcomePage");

    if (token) {
      setIsAuthenticated(true);
      setHasSeenWelcomePage(hasSeenWelcomePage === "true");
    }
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        // credentials: "include", // Include cookies in the request
      });
      console.log("response:", response);

      if (response) {
        const data = await response.json();
        console.log("data:");
        // const token = Cookies.get("token"); // Retrieve token from HttpOnly cookie
        // console.log("token:", response.token);

        if (data.token) {
          localStorage.setItem("token", data.token);
          setUser({ username, token: data.token });
          setIsAuthenticated(true);
          console.log("isAuthenticateds:", isAuthenticated, data.token);

          toast.success("Login successful");

          setTimeout(() => {
            // Check if the user has seen the welcome page
            const seenWelcomePage = localStorage.getItem("hasSeenWelcomePage");
            if (seenWelcomePage !== "true") {
              router.push("/welcome"); // Redirect to welcome page for new users
            } else {
              router.push("/main"); // Redirect to home page for existing users
            }

            // Request location permission
            requestLocationPermission();
          }, 500);
        }
      } else {
        toast.error("Invalid username or password");
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      toast.error("Invalid username or password");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("hasSeenWelcomePage");
        setIsAuthenticated(false);
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error;
    }
  };

  // Request location permission
  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location access granted:", position);
          // You can store the location in state or send it to the backend
        },
        (error) => {
          console.error("Location access denied:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Mark welcome page as seen
  const markWelcomePageAsSeen = () => {
    localStorage.setItem("hasSeenWelcomePage", "true");
    setHasSeenWelcomePage(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        hasSeenWelcomePage,
        user,
        login,
        logout,
        markWelcomePageAsSeen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
