// pages/search.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from "react-bootstrap";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (q) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((product) =>
            product.title.toLowerCase().includes(q.toLowerCase())
          );
          setResults(filtered);
        });
    }
  }, [q]);

  return (
    <Container className="mt-4">
      {/* <h2>Search Results for "{q}"</h2> */}
      {results.length === 0 ? (
        <p>Currently not in store.</p>
      ) : (
        <Row>
          {results.map((product) => (
            <Col key={product.id} md={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
