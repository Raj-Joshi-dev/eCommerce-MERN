import React from "react";
import "../styles.css";
import Base from "./Base";
import Cart from "./Cart";

export default function Home() {
  return (
    <Base title="Home Page" description="Welcome to the eCommerce App">
      <div className="row text-center">
        <div className="col-4">
          <button className="btn">
            <Cart />
          </button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
      </div>
    </Base>
  );
}
