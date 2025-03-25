import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect unauthenticated users to the login page
      console.log("Not authenticated");
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null; // Render children only if authenticated
};

export default ProtectedRoute;
