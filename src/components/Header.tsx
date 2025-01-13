import React from "react";
import { Button } from "./Button";
import UserIcon from "../assets/icons/users-solid.svg";
import { useNavigate } from "react-router-dom";

function Header({ username }: { username?: string }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div className="bg-slate-600 text-white py-5">
      <div className="mx-5 flex justify-between items-center ">
        <div className="flex items-center">
          <img className="me-3 max-sm:size-5" src={UserIcon} alt="User" />{" "}
          <span className="max-sm:text-sm">UserList</span>
        </div>
        <div className="flex items-center max-sm:text-sm">
          <span className="mx-5">Welcome {username ? username : "User"}!</span>
          <Button
            onClick={handleLogout}
            className="bg-red-600 active:bg-red-500 max-sm:w-20 max-sm:px-0"
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Header;
