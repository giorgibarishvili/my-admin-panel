import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";
import Dashboard from "../components/DashBoard";
import { User } from "../models/UserModels";

function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = (await fetchUsers()) as User[];
        setUsers(res);
      } catch (err) {
        setError("failed to fetch data");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="overflow-x-auto">
      <Dashboard />
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right text-left">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              email
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              age
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              status
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              <button className="inline-block rounded bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-600 mx-2">
                Create user
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {user.firstName + " " + user.lastName}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {user.email}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {user.age}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {user.role}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <button className="inline-block rounded bg-yellow-500 px-4 py-2 text-xs font-medium text-white hover:bg-yellow-600 mx-2">
                  edit
                </button>
                <button className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-600 mx-2">
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UserTable;
