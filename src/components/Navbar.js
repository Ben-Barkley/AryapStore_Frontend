import { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Badge,
  Container,
  Modal,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function NavbarComponent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout modal
  const { cart } = useCart();
  const { logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    router.push("/login");
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4 sticky-top">
        {/* {" "} */}
        {/* Make navbar sticky */}
        <Container>
          <Link href="/main" passHref style={{ textDecoration: "none" }}>
            <Navbar.Brand
              as="a"
              style={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              AryapStores
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/main">Home</Nav.Link>
              <Nav.Link href="/categories">Categories</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search for items..."
                className="me-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
            <Link href="/cart" passHref>
              <Button variant="light" className="ms-3">
                🛒 Cart <Badge bg="danger">{cart.length}</Badge>
              </Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => setShowLogoutModal(true)}
              className="ms-3"
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
