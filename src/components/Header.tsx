import React from "react";
import { Button } from "./Button";
import UserIcon from "../assets/icons/users-solid.svg";

function Header() {
  return (
    <div className="bg-slate-600 text-white py-5">
      <div className="mx-5 flex justify-between items-center">
        <div className="flex">
          <img className="me-3" src={UserIcon} alt="User" /> UserList
        </div>
        <div>
          <span className="mx-5">Welcome User!</span>
          <Button className="bg-red-600 active:bg-red-500">Log out</Button>
        </div>
      </div>
    </div>
  );
}
export default Header;
