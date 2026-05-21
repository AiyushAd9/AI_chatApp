import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/home");

    } catch (err) {

      console.log(err);

      alert("Login Failed");

    }

  };

  return (

    <div
      style={{
        width: "300px",
        margin: "100px auto",
        textAlign: "center"
      }}
    >

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

      </form>

      <p style={{ marginTop: "20px" }}>

        Don't have an account?{" "}

        <span
          onClick={() => navigate("/register")}
          style={{
            color: "blue",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Register
        </span>

      </p>

    </div>

  );

}

export default Login;