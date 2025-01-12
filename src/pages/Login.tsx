import React, { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await new Promise((resolve) => {
          localStorage.setItem("authToken", data.accessToken);
          localStorage.setItem("username", username);
          resolve(true);
        });
        navigate("/");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  if (error) return <p>{error}</p>;
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form
        className="grid p-10 justify-center max-w-3xl bg-white shadow-md rounded-lg "
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Admin Login
        </h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Input
          onChange={(e) => setUsername(e.target.value)}
          className="mt-5 w-72"
          placeholder="Email"
          type="text"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          className="mt-5 w-72"
          placeholder="Password"
          type="password"
        />
        <Button className="mt-5 bg-blue-600 active:bg-blue-500">Log in</Button>
      </form>
    </div>
  );
}
export default Login;
