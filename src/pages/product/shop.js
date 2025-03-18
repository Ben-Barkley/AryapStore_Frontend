// pages/shop.js
import { useState, useEffect } from "react";
import ProductList from "../../components/ProductList";
import { fetchClothes } from "../../api/clothes"; // Import the function

const Shop = () => {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    // Fetch clothes when the component mounts
    fetchClothes()
      .then((data) => setClothes(data))
      .catch((error) => console.error("Error fetching clothes:", error));
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      <ProductList clothes={clothes} />
    </div>
  );
};

export default Shop;
