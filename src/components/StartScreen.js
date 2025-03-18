import Image from "next/image";
import Link from "next/link";

const StartScreen = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      {/* App Logo */}
      <div className="mb-4">
        <Image
          src="/Group 1000004649.png"
          alt="Shoppe Logo"
          width={100}
          height={100}
        />
      </div>

      {/* Title & Description */}
      <h1 className="fw-bold">Shoppe</h1>
      <p className="text-muted">
        Beautiful eCommerce UI Kit for your online store
      </p>

      {/* Buttons */}
      <div className="w-100 px-4">
        <Link href="/create-account" passHref>
          <button className="btn btn-primary w-10 py-2">
            Lets get started
          </button>
        </Link>
        <div className="mt-3">
          <Link href="/login" passHref className="text-decoration-none">
            <span style={{ color: "#202020", cursor: "pointer" }}>
              I already have an account
            </span>
            <span
              className="ms-1 d-inline-flex align-items-center justify-content-center"
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: "#004CFF",
                color: "#FFFFFF",
                borderRadius: "50%",
              }}
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
