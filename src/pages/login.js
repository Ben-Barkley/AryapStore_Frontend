import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading <state></state>
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      await login(username, password); // Delegate login logic to AuthProvider
    } catch (error) {
      toast.error("An error occurred during login");
    }
    // finally {
    //   setLoading(false); // Stop loading
    // }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      {/* Card with Bubble Section */}
      <div
        className="card p-4 shadow-lg rounded-4 position-relative overflow-hidden"
        style={{ width: "26rem", height: "34rem" }} // Increased height to accommodate new sections
      >
        {/* Bubble Section (Inside Card) */}
        <div
          className="position-absolute w-100 h-100"
          style={{ pointerEvents: "none" }}
        >
          <Image
            src="/bubble 01.png"
            alt="bubble"
            width={150}
            height={150}
            className="position-absolute"
            style={{ bottom: "30em", left: "-34px", opacity: 0.5 }}
          />
          <Image
            src="/bubble 02.png"
            alt="bubble"
            width={100}
            height={100}
            className="position-absolute"
            style={{ bottom: "20px", right: "-30px", opacity: 0.5 }}
          />
        </div>

        {/* Login Content */}
        <h2 className="fw-bold text-start" style={{ marginTop: "5rem" }}>
          Login
        </h2>
        <p className="text-muted">
          Good to see you back! <span>❤️</span>
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            className="form-control mt-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Password Input */}
          <div className="input-group mt-3">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "👁" : "🙈"}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="mt-2 text-end">
            <Link
              href="/forgot-password" // Replace with your forgot password route
              className="text-muted"
              style={{ textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            className="btn btn-primary w-100 mt-4"
            type="submit"
            onClick={handleSubmit}
          >
            Next
          </button>
        </form>

        {/* Create New Account Section */}
        <div className="mt-4 text-center">
          <p className="text-muted">
            Dont have an account?{" "}
            <Link
              href="/create-account" // Replace with your signup route
              className="text-primary"
              style={{ textDecoration: "none" }}
            >
              Create New Account
            </Link>
          </p>
        </div>

        {/* Cancel Link */}
        <Link
          href="/"
          className="text-muted mt-2 d-block text-center"
          style={{ textDecoration: "none" }}
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default Login;
