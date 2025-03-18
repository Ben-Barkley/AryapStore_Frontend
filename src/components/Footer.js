import React from "react";
import "../styles/globals.css"; // Add this line to import the CSS file
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

function Footer() {
  return (
    <footer className="section-p1">
      <div className="col">
        <img className="logo" src="img/logo2.jpg" alt="Logo" />
        <h4>Contact</h4>
        <p>
          <i className="bi bi-geo-alt"></i> <strong> Address: </strong> 32
          Cliffland Estate, Gudu, FCT
        </p>
        <p>
          <i className="bi bi-telephone"></i> <strong> Phone: </strong> +234 808
          894 5782
        </p>
        <p>
          <i className="bi bi-envelope"></i> <strong> Hours: </strong> 24/7, Mon
          - Sat
        </p>

        <div className="follow">
          <h4>Follow Us</h4>
          <div className="icon">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-instagram"></i>
          </div>
        </div>
      </div>

      <div className="col">
        <h4>About</h4>
        <a href="#">About Us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact Us</a>
      </div>

      <div className="col">
        <h4>My Account</h4>
        <a href="#">Sign In</a>
        <a href="#">View cart</a>
        <a href="#">My Wishlist</a>
        <a href="#">Track My Order</a>
        <a href="#">Help</a>
      </div>

      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div className="row">
          <img src="img/pay/app.jpg" alt="App Store" />
          <img src="img/pay/play.jpg" alt="Google Play" />
        </div>
        <p>Secure Payment Gateways</p>
        <img src="img/pay/pay.png" alt="Payment Gateways" />
      </div>

      <div className="copyright">
        <p>© Ben_Barkley, 2022</p>
      </div>
    </footer>
  );
}

export default Footer;
