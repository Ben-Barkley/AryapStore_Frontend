import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import { fetchClothes } from "../api/clothes";
import StartScreen from "@/components/StartScreen";
import CreateAccount from "@/components/CreateAccount";
import Login from "@/components/Login";
import WelcomeScreen from "@/components/WelcomeScreen";
import ThriftRandomizer from "./thrift";

const Home = ({ clothes }) => {
  const [screen, setScreen] = useState("start");

  useEffect(() => {
    // Check if the user has completed the flow
    const hasCompletedFlow = localStorage.getItem("hasCompletedFlow");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (hasCompletedFlow && isLoggedIn) {
      setScreen("home"); // If the user completed the flow and logged in, show the main store page
    }
  }, []);

  const handleNext = () => {
    switch (screen) {
      case "start":
        setScreen("createAccount");
        break;
      case "createAccount":
        setScreen("login");
        break;
      case "login":
        setScreen("welcome");
        break;
      case "thrift":
        setScreen("thrift");
        break;
      case "welcome":
        localStorage.setItem("hasCompletedFlow", "true");
        localStorage.setItem("isLoggedIn", "true");
        setScreen("home");
        break;
      default:
        setScreen("home");
    }
  };

  return (
    <>
      <Head>
        <title>Dav_Milan Store</title>
        <meta name="description" content="Welcome to Dav_Milan Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Screen Flow */}
      {screen === "start" && <StartScreen onNext={handleNext} />}
      {screen === "createAccount" && <CreateAccount onNext={handleNext} />}
      {screen === "login" && <Login onNext={handleNext} />}
      {screen === "login" && <ThriftRandomizer onNext={handleNext} />}
      {screen === "welcome" && <WelcomeScreen onNext={handleNext} />}

      {screen === "home" && (
        <>
          {/* Header */}
          <Header />
          {/* Hero Section */}
          <Hero />
          {/* Featured Products */}
          <section id="product1" className="section-p1">
            <h2>Featured Products</h2>
            <p>Summer Collection - New Modern Design</p>
            <ProductList clothes={clothes} />
          </section>
          {/* Banner Section */}
          <section id="banner" className="section-m1">
            <div className="banner-box">
              <h4>Repair Services</h4>
              <h2>Up to 15% Off</h2>
              <span>All T-Shirts & Accessories</span>
              <button>Explore More</button>
            </div>
          </section>
          {/* Newsletter Section */}
          <section id="newsletter" className="section-p1 section-m1">
            <div className="newstext">
              <h4>Sign Up For Newsletters</h4>
              <p>
                Get E-mail updates about our latest shop and special offers.
              </p>
            </div>
            <form>
              <input type="text" placeholder="Your email address" />
              <button type="submit">Sign Up</button>
            </form>
          </section>
          {/* Footer */}
          <Footer />
        </>
      )}
    </>
  );
};

export async function getServerSideProps() {
  const clothes = await fetchClothes(); // Fetch product data from the API

  return {
    props: {
      clothes, // Pass the fetched data as props
    },
  };
}

export default Home;
