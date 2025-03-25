import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FlagFill } from "react-bootstrap-icons";
import { useRouter } from "next/router";

const CreateAccount = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        toast.success("Account created successfully!");
        router.push("/login"); //Redirect to login page
      } else {
        toast.error("Failed to create account");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      {/* Card with bubble images inside */}
      <div
        className="card p-4 shadow-lg rounded-4 position-relative overflow-hidden"
        style={{ width: "26rem" }}
      >
        {/* Bubble Images inside the Card */}
        <Image
          src="/bubble 02.png"
          alt="bubble"
          width={100}
          height={100}
          className="position-absolute"
          style={{ top: "-20px", left: "-20px", opacity: 0.5 }}
        />
        <Image
          src="/bubble 01.png"
          alt="bubble"
          width={120}
          height={80}
          className="position-absolute"
          style={{ top: "10px", right: "-10px", opacity: 0.5 }}
        />

        {/* Content inside the Card */}
        <h2 className="fw-bold text-start">Create Account</h2>

        {/* Profile Image Upload */}
        {/* <label className="upload-btn mt-3 d-flex justify-content-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
          <div className="profile-placeholder">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                width={70}
                height={70}
                className="rounded-circle"
              />
            ) : (
              <div className="camera-icon">📷</div>
            )}
          </div>
        </label> */}

        {/* Form Inputs */}

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="form-control mt-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="form-control mt-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

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

        {/* Buttons */}
        <button
          className="btn btn-primary w-100 mt-4"
          type="submit"
          onClick={handleSubmit}
        >
          Done
        </button>
        <Link
          href="/"
          className="text-muted mt-2"
          style={{ textAlign: "center", textDecoration: "none" }}
        >
          Cancel
        </Link>
      </div>

      {/* Styles */}
      <style jsx>{`
        .profile-placeholder {
          width: 70px;
          height: 70px;
          border: 2px dashed #0057ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1;
        }
        .camera-icon {
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default CreateAccount;
