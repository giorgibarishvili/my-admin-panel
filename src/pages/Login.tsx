import React from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

function Login() {
  return (
    <form className="grid container justify-center mt-10 mx-auto border-solid border-2 border-blue-600 max-w-lg py-5">
      <Input className="mt-5" placeholder="Email" type="email" />
      <Input className="mt-5" placeholder="Password" type="password" />
      <Button className="mt-5">Log in</Button>
    </form>
  );
}
export default Login;
