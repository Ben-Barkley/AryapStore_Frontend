// pages/checkout.js
import { Container, Form, Button, Row, Col } from "react-bootstrap";

export default function Checkout() {
  return (
    <Container className="mt-4">
      <h1>Checkout</h1>
      <Row>
        <Col md={6}>
          <h2>Shipping Information</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" placeholder="Enter zip code" />
            </Form.Group>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Payment Method</h2>
          <Form>
            <Form.Check
              type="radio"
              label="Credit/Debit Card"
              name="paymentMethod"
              id="card"
            />
            <Form.Check
              type="radio"
              label="Bank Transfer"
              name="paymentMethod"
              id="bank"
            />
          </Form>
          <Button variant="primary" className="mt-3">
            Place Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
