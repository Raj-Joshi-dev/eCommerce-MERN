import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Cart from "./Cart";
import { getAllProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the eCommerce App">
      <div className="row text-center">
        <h1 className="text-white">All Products</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Cart product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
