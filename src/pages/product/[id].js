// pages/product/[id].js
import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Badge } from "react-bootstrap";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/router";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/Clothes/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <div style={{ height: "400px", position: "relative" }}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="contain"
            />
            {/* Display discount badge for flash sale items */}
            {product.category === "men's clothing" && (
              <Badge
                bg="danger"
                className="position-absolute top-0 start-0 m-2"
              >
                50% OFF
              </Badge>
            )}
          </div>
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="fw-bold">${product.price}</p>
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
