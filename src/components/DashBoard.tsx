import React from "react";
import { Button } from "./Button";

function Dashboard() {
  return (
    <div className="bg-slate-600 text-white py-5">
      <div className="mx-5 flex justify-between items-center">
        icon UserList
        <div>
          <span className="mx-5">Welcome User!</span>
          <Button className="bg-red-600">Log out</Button>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
