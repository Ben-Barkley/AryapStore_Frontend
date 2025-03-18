// pages/main.js
import { useEffect, useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [justForYou, setJustForYou] = useState([]);

  useEffect(() => {
    // Fetch products for Flash Sale
    fetch("http://localhost:5000/api/Clothes")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    // Fetch products for Top Products
    fetch("http://localhost:5000/api/Clothes")
      .then((res) => res.json())
      .then((data) => setTopProducts(data));

    // Fetch products for Just For You
    fetch("http://localhost:5000/api/Clothes")
      .then((res) => res.json())
      .then((data) => setJustForYou(data));
  }, []);

  return (
    <div>
      <HeroCarousel />
      <Container>
        <h2>Flash Sale</h2>
        <Row>
          {products.slice(0, 4).map(
            (product) => (
              console.log(product),
              (
                <Col key={product.clothId} md={3} className="mb-4">
                  <ProductCard product={product} showDiscount={true} />
                </Col>
              )
            )
          )}
        </Row>

        <h2>Top Products</h2>
        <Row>
          {topProducts.slice(0, 4).map((product) => (
            <Col key={product.clothId} md={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>

        <h2>Just For You</h2>
        <Row>
          {justForYou.slice(0, 4).map((product) => (
            <Col key={product.clothId} md={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
