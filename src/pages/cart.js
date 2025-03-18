import { useEffect, useState } from "react";
import { Button, Badge, Container, Spinner } from "react-bootstrap";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { addToCart } from "../api/clothes";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(true); // State for loading spinner

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1-second delay
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleUpdateQuantity = (
    clothId,
    currentQuantity,
    maxStock,
    operation
  ) => {
    const newQuantity =
      operation === "increment"
        ? Math.min(currentQuantity + 1, maxStock) // Increment but don't exceed stock
        : Math.max(currentQuantity - 1, 1); // Decrement but don't go below 1

    // Update the local cart state
    updateQuantity(clothId, newQuantity); // Use updateQuantity from context
    // setCart((prevCart) =>
    //   prevCart.map((item) =>
    //     item.id === clothId ? { ...item, quantity: newQuantity } : item
    //   )
    // );
  };

  const handleCheckout = async () => {
    try {
      const updatedItems = cart.filter((item) => item.quantity > 0); // Filter out items with quantity 0

      // Send updated quantities to the backend
      // await apiCheckout(userId, updatedItems);
      await apiCheckout(updatedItems);

      alert("Checkout successful!");
      updateQuantity(clothId, newQuantity); // Use updateQuantity from context
      // setCart([]); // Clear the cart after checkout
    } catch (error) {
      console.error("Failed to checkout:", error);
      alert("Error: Failed to checkout.");
    }
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
        <h1>Cart ({cart.length})</h1>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.clothId}
                className="d-flex align-items-start border-bottom p-3"
                style={{ gap: "16px" }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    position: "relative",
                    flexShrink: 0,
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 style={{ fontSize: "1rem", marginBottom: "4px" }}>
                    {item.name}
                  </h5>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#666",
                      marginBottom: "4px",
                    }}
                  >
                    Seller: {item.seller} | Size: {item.size}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#666",
                      marginBottom: "8px",
                    }}
                  >
                    Few units left
                  </p>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="light"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click event from firing

                        handleUpdateQuantity(
                          item.clothId,
                          item.quantity,
                          item.stock,
                          "decrement"
                        );
                      }}
                      disabled={item.quantity <= 1} // Disable - button if quantity equals 1
                      style={{ padding: "4px 8px" }}
                    >
                      -
                    </Button>
                    <Badge bg="secondary" className="mx-2">
                      {item.quantity}
                      {console.log("FIND ITEM", item.quantity)}
                    </Badge>
                    <Button
                      variant="light"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click event from firing}
                        handleUpdateQuantity(
                          item.clothId,
                          item.quantity,
                          item.stock,
                          "increment"
                        );

                        //handleUpdateQuantity(item.clothId, item.quantity + 1)
                      }}
                      disabled={item.quantity >= item.stock} // Disable + button if quantity equals stock
                      style={{ padding: "4px 8px" }}
                    >
                      +
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                      className="ms-3"
                      style={{ padding: "4px 8px" }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </p>
                  {item.discount && (
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#666",
                        marginBottom: "0",
                      }}
                    >
                      {item.discount}% OFF
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 border-top">
              <h5>Cart Summary</h5>
              <div className="d-flex justify-content-between">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Delivery fees not included yet.</p>
              </div>
              <Link href="/checkout" passHref>
                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  onClick={handleCheckout}
                >
                  Checkout (${totalPrice.toFixed(2)})
                </Button>
              </Link>
              <p
                className="mt-3"
                style={{ fontSize: "0.875rem", color: "#666" }}
              >
                Returns are easy. Free return within 7 days for ALL eligible
                items.{" "}
                <a href="#" style={{ color: "#007bff" }}>
                  Details
                </a>
              </p>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
