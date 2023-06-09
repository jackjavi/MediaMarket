"use client";

import { FaShoppingCart, FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import Checkout from "./Checkout";

const Cart = ({
  cartItems,
  setCartItems,
  product,
  removeItem,
  updateQuantity,
  showModal,
  setShowModal,
}) => {
  const updateCart = () => {
    if (product) {
      const itemExists = cartItems.some((item) => item._id === product._id);

      if (itemExists) {
        const updatedCartItems = cartItems.map((item) => {
          if (item._id === product._id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } else {
        const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
    }
  };
  const handleRemoveItem = (item) => {
    removeItem(item);
  };

  const handleIncreaseQuantity = (item) => {
    updateQuantity(item, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item, item.quantity - 1);
    }
  };

  const handleCheckout = () => {
    // Add your code to handle the checkout action, such as navigating to a checkout page or opening a modal.
    // You can use the router from Next.js to navigate to a new page:
    // router.push('/checkout');

    // Alternatively, you can show a modal with a form for entering shipping and payment details:
    setShowModal(true);
  };

  // Function to calculate the total quantity in the cart
  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    for (const item of cartItems) {
      if (item && item.quantity) {
        totalQuantity += item.quantity;
      }
    }
    return totalQuantity;
  };

  // Function to calculate the total price in the cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      if (item && item.quantity && item.price) {
        totalPrice += item.quantity * item.price;
      }
    }
    return totalPrice;
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 bg-black shadow-lg rounded-md">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      <div onClick={updateCart}>
        <FaShoppingCart />
      </div>
      {cartItems && cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {cartItems.map(
            (item, index) =>
              item && (
                <li key={index} className="flex items-center">
                  <span className="mr-2">{item.name}</span>
                  <button onClick={() => handleDecreaseQuantity(item)}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item)}>
                    <FaPlus />
                  </button>
                  <FaTimes onClick={() => handleRemoveItem(item)} />
                </li>
              )
          )}
        </ul>
      )}

      <button onClick={handleCheckout} className="btn-checkout">
        Checkout
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-8 rounded-md">
            {/* Modal content */}
            <Checkout cartItems={cartItems} />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 px-2 py-1 bg-gray-300 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
