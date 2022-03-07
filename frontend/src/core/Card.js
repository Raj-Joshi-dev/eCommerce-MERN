import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Cart from "./Cart";
import { loadCart } from "./helper/cartHelper";

const Card = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(loadCart());
  }, []);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => (
          <Cart
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
          />
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section is for Checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Card;