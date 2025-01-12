import React, { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { fetchUsers } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { User } from "../models/UserModels";

function Login() {
  const [usersLogin, setUsersLogin] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getUsersLogin = async () => {
      try {
        const res = (await fetchUsers()) as User[];
        setUsersLogin(res);
      } catch (err) {
        setError("failed to fetch data");
        console.log(err);
      }
    };
    getUsersLogin();
  }, []);

  const handleLogin = () => {
    const user = usersLogin.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      navigate("/");
    } else {
      setError("Invalid email or password");
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
          onChange={(e) => setEmail(e.target.value)}
          className="mt-5 w-72"
          placeholder="Email"
          type="email"
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
