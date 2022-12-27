import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../features/auth/authSlice";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;
  const { user, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const userAuth = {
      email,
      password,
    };

    dispatch(login(userAuth));
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="form-wrapper" onSubmit={handleSubmit}>
      <form className="flex flex-col form">
        <h1 className="font-bold text-3xl mb-5">Login</h1>
        <input
          type="email"
          placeholder="email"
          required
          name="email"
          onChange={(e) =>
            setState({ ...state, [e.target.name]: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="password"
          required
          name="password"
          onChange={(e) =>
            setState({ ...state, [e.target.name]: e.target.value })
          }
        />
        <p className="text-red-800">{error}</p>
        <button type="submit" className="btn submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
