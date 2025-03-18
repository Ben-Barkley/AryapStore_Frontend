import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const WelcomeScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (hasSeenWelcome) {
      router.replace("/main"); // Redirect to main page
    }
  }, [router]);

  const handleGetStarted = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    router.replace("/main");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      {/* Bootstrap Card */}
      <div className="card shadow-lg rounded-4" style={{ width: "22rem" }}>
        {/* Image Section */}
        <div
          className="position-relative"
          style={{ height: "25em", objectFit: "contain" }}
        >
          <Image
            src="/Placeholder_01@2x.png" // Use WebP format for better quality
            alt="Shopping"
            layout="fill"
            objectFit="cover"
            quality={100} // Increase quality
            className="rounded-top-4"
          />
        </div>

        {/* Card Body */}
        <div className="card-body text-center">
          <h3 className="card-title fw-bold">Ready?</h3>
          <p className="card-text text-muted">
            Unfold the Art of Fashion. Explore AryapStores
          </p>

          {/* Get Started Button */}
          <button
            onClick={handleGetStarted}
            className="btn btn-primary w-90 rounded-pill fw-semibold"
            style={{ height: "3em", width: "14em" }}
          >
            Lets Start
          </button>

          {/* Pagination Dots */}
          {/* <div className="mt-4 d-flex justify-content-center">
            <span
              className="dot bg-secondary rounded-circle mx-1"
              style={{ width: "10px", height: "10px" }}
            ></span>
            <span
              className="dot bg-secondary rounded-circle mx-1"
              style={{ width: "10px", height: "10px" }}
            ></span>
            <span
              className="dot bg-primary rounded-circle mx-1"
              style={{ width: "10px", height: "10px" }}
            ></span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
