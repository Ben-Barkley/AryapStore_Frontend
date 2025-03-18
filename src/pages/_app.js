// pages/_app.js
import NavbarComponent from "../components/Navbar";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Pages where the navbar should NOT be visible
  const noNavbarPages = [
    "/startscreen",
    "/newsletter",
    "/welcomescreen",
    "/login",
    "/checkout",
    "/create-account",
  ];

  // Check if the current page is in the noNavbarPages list
  const showNavbar = !noNavbarPages.includes(router.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        {showNavbar && <NavbarComponent />}
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
