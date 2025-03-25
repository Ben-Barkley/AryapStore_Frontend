// Function to fetch all clothes from the backend
export const fetchClothes = async () => {
  const response = await fetch("http://localhost:5000/api/clothes", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch clothes");
  }
  return response.json();
};

// Function to add a clothing item to the cart
export const addToCart = async (id, quantity) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/clothes/add-to-cart",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Id: id, Quantity: quantity }), // No userId needed
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.Error || "Failed to add to cart");
    }

    return response.json();
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    throw error;
  }
};

//This function sends the cart items to the backend for stock reduction and order processing
export const apiCheckout = async (cartItems) => {
  console.log("Sending request to API:", cartItems);
  try {
    const response = await fetch("http://localhost:5000/api/clothes/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // UserId: userId,
        Items: cartItems.map((item) => ({
          ClothId: item.clothId,
          Quantity: item.quantity,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.Error || "Failed to checkout");
    }

    return response.json();
  } catch (error) {
    console.error("Error during checkout:", error.message);
    throw error;
  }
};

// Function to fetch a single clothing item by ID
export const fetchClothById = async (id) => {
  const response = await fetch(`http://localhost:5000/api/clothes/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch cloth");
  }
  return response.json();
};
