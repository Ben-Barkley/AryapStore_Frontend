import { Button, Badge } from "react-bootstrap";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";

export default function ProductCard({ product, showDiscount }) {
  const { addToCart } = useCart();
  const router = useRouter();

  // Navigate to product details page when the card is clicked
  const handleCardClick = () => {
    router.push(`/product/${product.clothId}`);
  };

  console.log("check product:", product);
  return (
    <div
      className="card h-100"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div style={{ height: "200px", position: "relative" }}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="card-img-top"
        />
        {showDiscount && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            50% OFF
          </Badge>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title" style={{ fontSize: "1rem" }}>
          {product.name}
        </h5>
        <p className="card-text">${product.price}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Button
            variant="primary"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event from firing
              addToCart(product);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
