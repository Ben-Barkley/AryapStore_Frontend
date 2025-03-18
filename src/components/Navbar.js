// // components/Navbar.js
// import { useState } from "react";
// import {
//   Navbar,
//   Nav,
//   Form,
//   Button,
//   Badge,
//   Container,
//   Modal,
// } from "react-bootstrap";
// import { useRouter } from "next/router";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";

// export default function NavbarComponent() {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [showCartModal, setShowCartModal] = useState(false);
//   const { cart, removeFromCart, updateQuantity } = useCart();
//   const { logout } = useAuth();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${searchQuery}`);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     setShowLogoutModal(false);
//     router.push("/login");
//   };

//   const totalPrice = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <>
//       <Navbar bg="light" expand="lg" className="mb-4">
//         <Container>
//           <Navbar.Brand href="/">AryapStores</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//               <Nav.Link href="/">Home</Nav.Link>
//               <Nav.Link href="/categories">Categories</Nav.Link>
//               <Nav.Link href="/profile">Profile</Nav.Link>
//             </Nav>
//             <Form className="d-flex" onSubmit={handleSearch}>
//               <Form.Control
//                 type="search"
//                 placeholder="Search for items..."
//                 className="me-2"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <Button variant="outline-success" type="submit">
//                 Search
//               </Button>
//             </Form>
//             <Button
//               variant="light"
//               onClick={() => setShowCartModal(true)}
//               className="ms-3"
//             >
//               🛒 Cart <Badge bg="danger">{cart.length}</Badge>
//             </Button>
//             <Button
//               variant="danger"
//               onClick={() => setShowLogoutModal(true)}
//               className="ms-3"
//             >
//               Logout
//             </Button>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Cart Modal */}
//       <Modal
//         show={showCartModal}
//         onHide={() => setShowCartModal(false)}
//         size="lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Your Cart</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {cart.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             <>
//               {cart.map((item) => (
//                 <div
//                   key={item.id}
//                   className="d-flex align-items-center border p-3 mb-3"
//                 >
//                   <div
//                     style={{
//                       width: "100px",
//                       height: "100px",
//                       position: "relative",
//                     }}
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded"
//                     />
//                   </div>
//                   <div className="ms-4 flex-grow-1">
//                     <h5>{item.title}</h5>
//                     <p>${item.price}</p>
//                     <div className="d-flex align-items-center">
//                       <Button
//                         variant="light"
//                         onClick={() =>
//                           updateQuantity(item.id, item.quantity - 1)
//                         }
//                       >
//                         -
//                       </Button>
//                       <Badge bg="secondary" className="mx-2">
//                         {item.quantity}
//                       </Badge>
//                       <Button
//                         variant="light"
//                         onClick={() =>
//                           updateQuantity(item.id, item.quantity + 1)
//                         }
//                       >
//                         +
//                       </Button>
//                       <Button
//                         variant="danger"
//                         onClick={() => removeFromCart(item.id)}
//                         className="ms-3"
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <div className="text-end">
//                 <h4>Total: ${totalPrice.toFixed(2)}</h4>
//                 <Button
//                   variant="primary"
//                   onClick={() => router.push("/checkout")}
//                 >
//                   Proceed to Checkout
//                 </Button>
//               </div>
//             </>
//           )}
//         </Modal.Body>
//       </Modal>

//       {/* Logout Confirmation Modal */}
//       <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Logout</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to logout?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

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
        {" "}
        {/* Make navbar sticky */}
        <Container>
          <Navbar.Brand href="/main" style={{ fontWeight: "bold" }}>
            AryapStores
          </Navbar.Brand>
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
