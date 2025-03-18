import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FlagFill } from "react-bootstrap-icons";

const CreateAccount = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

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
          height={120}
          className="position-absolute"
          style={{ top: "10px", right: "-10px", opacity: 0.5 }}
        />

        {/* Content inside the Card */}
        <h2 className="fw-bold text-start">Create Account</h2>

        {/* Profile Image Upload */}
        <label className="upload-btn mt-3 d-flex justify-content-center">
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
        </label>

        {/* Form Inputs */}
        <input type="email" placeholder="Email" className="form-control mt-3" />

        <div className="input-group mt-3">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className="form-control"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? "👁" : "🙈"}
          </button>
        </div>

        <div className="input-group mt-3">
          <select className="form-select" style={{ maxWidth: "100px" }}>
            <option value="+44">🇬🇧 +44</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+91">🇮🇳 +91</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+81">🇯🇵 +81</option>
            {/* Add more country codes as needed */}
          </select>
          <input
            type="text"
            placeholder="Your number"
            className="form-control"
          />
        </div>

        {/* Buttons */}
        <button className="btn btn-primary w-100 mt-4">Done</button>
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
