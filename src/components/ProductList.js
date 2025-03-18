import { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/globals.css"; // Add this line to import the CSS file

const ProductList = () => {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    // Fetch clothes from the backend
    fetch("http://localhost:5000/api/clothes")
      .then((res) => res.json())
      .then((data) => setClothes(data))
      .catch((error) => console.error("Error fetching clothes:", error));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {clothes.length > 0 ? (
          clothes.map((item) => (
            <div
              key={item.ClothId}
              className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch"
            >
              <div className="card h-100 text-center custom-card">
                {console.log(item, "here")}
                <img
                  alt={item.Name}
                  src={item.ImageUrl}
                  className="card-img-top"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "auto",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">₦{item.price}</p>
                  <Link href={`/product/${item.clothId}`} passHref>
                    <a className="btn btn-primary">View Details</a>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
