import React from "react";

const Checkout = ({ cartItems }) => {
  // Implement your checkout component here, including the summary of items and the form for entering shipping and payment details.
  // Function to calculate the total quantity in the cart
  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    for (const item of cartItems) {
      totalQuantity += item.quantity;
    }
    return totalQuantity;
  };

  // Function to calculate the total price in the cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.quantity * item.price;
    }
    return totalPrice;
  };
  return (
    <div>
      <h2>Checkout</h2>
      {/* Display the summary of items */}
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Quantity: {calculateTotalQuantity()}</p>
      <p>Total Price: {calculateTotalPrice()}</p>
      {/* Implement the form for entering shipping and payment details */}
      {/* ... */}
    </div>
  );
};

export default Checkout;
