import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../features/auth/authSlice";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = state;

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    dispatch(register(user));
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="form-wrapper">
      <form className="flex flex-col form" onSubmit={handleSubmit}>
        <h1 className="font-bold text-3xl mb-5">Register</h1>
        <input
          type="text"
          placeholder="name"
          name="name"
          required
          onChange={(e) =>
            setState({ ...state, [e.target.name]: e.target.value })
          }
          value={name}
        />
        <input
          type="email"
          placeholder="email"
          required
          name="email"
          onChange={(e) =>
            setState({ ...state, [e.target.name]: e.target.value })
          }
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          required
          name="password"
          onChange={(e) =>
            setState({ ...state, [e.target.name]: e.target.value })
          }
          value={password}
        />
        <button type="submit" className="btn submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
