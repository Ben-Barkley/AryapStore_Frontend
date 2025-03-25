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
      {/* Screen Flow */}
      {screen === "start" && <StartScreen onNext={handleNext} />}
      {screen === "login" && <Login onNext={handleNext} />}
      {screen === "createAccount" && <CreateAccount onNext={handleNext} />}
      {screen === "welcome" && <WelcomeScreen onNext={handleNext} />}

      {screen === "home" && (
        <>
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
