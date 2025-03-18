// pages/checkout.js
import { useState } from "react";
import { Container, Form, Button, Modal, Row, Col } from "react-bootstrap";
import { FaCopy, FaCheck } from "react-icons/fa"; // Import copy icon
import { useRouter } from "next/router";

export default function Checkout() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
  const [paymentMethod, setPaymentMethod] = useState("card"); // State for payment method

  // Handle copy functionality
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // Handle cancel payment
  const handleCancelPayment = () => {
    router.push("/cart");
  };

  const handleContinueShopping = (message) => {
    setShowSuccessModal(false);
    alert(message); // Display the message
    router.push("/main");
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Container
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Payment Information</h2>

        {/* Payment Method Toggle */}
        <div className="d-flex justify-content-center mb-4">
          <Button
            variant={paymentMethod === "card" ? "primary" : "outline-primary"}
            onClick={() => setPaymentMethod("card")}
            className="me-3"
          >
            Debit Card
          </Button>
          <Button
            variant={paymentMethod === "bank" ? "primary" : "outline-primary"}
            onClick={() => setPaymentMethod("bank")}
          >
            Bank Transfer
          </Button>
        </div>

        {/* Debit Card Payment Section */}
        {paymentMethod === "card" && (
          <div className="mt-4">
            <h4>Debit Card Payment</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="0000 0000 0000 0000" />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control type="text" placeholder="MM / YY" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control type="text" placeholder="CVV" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Card Holder</Form.Label>
                <Form.Control type="text" placeholder="Full Name" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </div>
        )}

        {/* Bank Transfer Section */}
        {paymentMethod === "bank" && (
          <div className="mt-4">
            <h4>Bank Transfer</h4>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <p>
                <strong>Bank Name:</strong> AryapStores Bank
              </p>
              <p>
                <strong>Account Number:</strong> 1234567890{" "}
                <FaCopy
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  onClick={() => handleCopy("1234567890")}
                />
              </p>
              <p>
                <strong>Amount:</strong> $100.00{" "}
                <FaCopy
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  onClick={() => handleCopy("100.00")}
                />
              </p>
              <p style={{ fontSize: "0.875rem", color: "#666" }}>
                This account is for this transaction only and expires in 30
                minutes.
              </p>
              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="primary"
                  onClick={() => setShowSuccessModal(true)}
                >
                  I Have Sent the Money
                </Button>
                <Button variant="danger" onClick={handleCancelPayment}>
                  Cancel Payment
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* Payment Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div style={{ fontSize: "3rem", color: "green" }}>
            <FaCheck />
          </div>{" "}
          {/* Green check tick */}
          <p>Your payment has been processed successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() =>
              handleContinueShopping("Thank you for your purchase!")
            }
          >
            Continue Shopping
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
