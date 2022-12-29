import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const { user, error } = useSelector((state) => state.auth);

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

        <p className="text-red-800">{error}</p>

        <button type="submit" className="btn submit-btn">
          Submit
        </button>
      </form>

      <div className="flex py-5">
        <Link to="/" className="font-bold hover:text-blue-400">
          Home |
        </Link>
        <p className="mx-4">Already have an Account? | </p>
        <Link to="/login" className="font-bold hover:text-blue-400">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
