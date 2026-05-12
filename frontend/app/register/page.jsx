"use client";

import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert("Registration Successful");

      console.log(res.data);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111827",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "350px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "black",
          }}
        >
          TrustHire Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid gray",
            borderRadius: "5px",
            color: "black",
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid gray",
            borderRadius: "5px",
            color: "black",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid gray",
            borderRadius: "5px",
            color: "black",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}