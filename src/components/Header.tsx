import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import UserIcon from "../assets/icons/users-solid.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get("https://dummyjson.com/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div className="bg-slate-600 text-white py-5">
      <div className="mx-5 flex justify-between items-center">
        <div className="flex">
          <img className="me-3" src={UserIcon} alt="User" /> UserList
        </div>
        <div>
          <span className="mx-5">Welcome {user ? user.username : "User"}!</span>
          <Button
            onClick={handleLogout}
            className="bg-red-600 active:bg-red-500"
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Header;
