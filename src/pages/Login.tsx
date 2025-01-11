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
    <form
      className="grid container justify-center mt-10 mx-auto border-solid border-2 border-blue-600 max-w-lg py-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Input
        onChange={(e) => setEmail(e.target.value)}
        className="mt-5"
        placeholder="Email"
        type="email"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        className="mt-5"
        placeholder="Password"
        type="password"
      />
      <Button className="mt-5 bg-blue-600s active:bg-blue-500">Log in</Button>
    </form>
  );
}
export default Login;
