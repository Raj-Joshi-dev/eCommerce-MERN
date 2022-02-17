import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";

const SignUp = () => {
  const SignUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input className="form-control" type="text" />
            </div>
            <div className="form-group">
              <label className="text-light">E-mail</label>
              <input className="form-control" type="text" />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input className="form-control" type="password" />
            </div>
            <button className="btn btn-success btn-block">Submit</button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="SignUp Page" description="A page for user to sign up!">
      {SignUpForm()}
    </Base>
  );
};

export default SignUp;
