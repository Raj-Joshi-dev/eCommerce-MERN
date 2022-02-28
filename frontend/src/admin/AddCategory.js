import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

export default function AddCategory() {
  const [name, setName] = useState("initialState");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-small btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const CategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="Eg: Summer"
        />
        <button className="btn btn-outline-info">Create Category</button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category"
      description="Add a new category for T-shirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          <h1>
            {CategoryForm()} {goBack()}
          </h1>
        </div>
      </div>
    </Base>
  );
}
