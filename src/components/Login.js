import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Login = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password); // Calls the login function from the parent
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      {/* Card with Bubble Section */}
      <div
        className="card p-4 shadow-lg rounded-4 position-relative overflow-hidden"
        style={{ width: "26rem", height: "30rem" }}
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
            style={{ bottom: "23em", left: "-30px", opacity: 0.5 }}
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
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="form-control mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <button className="btn btn-primary w-100 mt-4" type="submit">
            Next
          </button>
        </form>

        {/* Cancel Link */}
        <Link href="/" className="text-muted mt-2 d-block text-center">
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default Login;
