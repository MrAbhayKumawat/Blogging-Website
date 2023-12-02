import React from "react";
import "./Banner.scss";
import { useNavigate } from "react-router-dom";
function Banner() {
  const navigate = useNavigate();

  return (
    <div className="banner">
      <nav className="navbar navbar-expand  fixed-top">
        <div className="container-fluid">
          <h2 style={{ letterSpacing: "3px", fontWeight: "700" }}>B' log</h2>
        </div>
        <button
          onClick={() => navigate("/Login")}
          className="btn"
          style={{
            color: "black",
            minWidth: "120px",
            minHeight: "10px",
            border: "1px solid black",
          }}
        >
          Login
        </button>
      </nav>
      <div className="container">
        <div className="hero-main">
          <h1 style={{ fontWeight: "700" }}>Publish your passions, your way</h1>
          <p style={{ color: "black", textAlign : "center"}}>Create a unique and beautiful blog easily.</p>
          <button
            onClick={() => navigate("/SignUp")}
            className="btn"
            style={{ color: "black", border: "1px solid black" }}
          >
            CREATE YOUR BLOG
          </button>{" "}
        </div>
      </div>
    </div>
  );
}

export default Banner;
