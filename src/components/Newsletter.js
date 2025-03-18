import React from "react";
import "../styles/globals.css"; // Add this line to import the CSS file

function Newsletter() {
  return (
    <section id="newsletter" className="section-p1 section-m1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h4>Sign Up For Newsletters</h4>
            <p>
              Get E-mail updates about our latest shop and{" "}
              <span>special offers</span>
            </p>
          </div>
          <div className="col-md-6">
            <form className="form">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Your Email Address"
                // style={{ flex: "1" }}
              />
              <button className="normal btn btn-warning">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
