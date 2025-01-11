import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";
import Header from "../components/Header";
import { User } from "../models/UserModels";
import Modal from "../components/Modal";
import axios from "axios";
import UserCreateEditModal from "../components/UserCreateEditModal";
import { ButtonSmall } from "../components/ButtonSmall";

function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [userCreateOrEdit, setUserCreateOrEdit] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

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

  const handleEditClick = (user: User) => {
    setUserToEdit(user);
    setUserCreateOrEdit(true);
  };

  const handleCreateClick = () => {
    setUserToEdit(null);
    setUserCreateOrEdit(true);
  };

  const handleSaveUser = async (user: User) => {
    try {
      if (userToEdit) {
        await axios.put(`https://dummyjson.com/users/${user.id}`, user);
      } else {
        delete (user as any).id; //TODO
        await axios.post("https://dummyjson.com/users/add", user);
      }
      const res = (await fetchUsers()) as User[];
      setUsers(res);
      setUserCreateOrEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userToDelete)
      );
      axios
        .delete(`https://dummyjson.com/users/${userToDelete}`)
        .catch(console.error);
      setUserToDelete(null);
    }
    const res = (await fetchUsers()) as User[];
    setUsers(res);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="overflow-x-auto">
      <Header />
      {userCreateOrEdit && (
        <UserCreateEditModal
          title={userToEdit ? "Edit user" : "Create user"}
          onClose={() => setUserCreateOrEdit(false)}
          message={
            userToEdit
              ? "Do you want to edit this user?"
              : "Do you want to create this user?"
          }
          user={userToEdit}
          onSave={handleSaveUser}
        ></UserCreateEditModal>
      )}
      {userToDelete && (
        <Modal
          title="Delete User"
          message="Do you want to delete user?"
          onClose={() => setUserToDelete(null)}
        >
          <div>
            <ButtonSmall onClick={() => handleConfirmDelete()} color="green">
              yes
            </ButtonSmall>
            <ButtonSmall onClick={() => setUserToDelete(null)} color="red">
              no
            </ButtonSmall>
          </div>
        </Modal>
      )}
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
              <ButtonSmall onClick={() => handleCreateClick()} color="green">
                Create user
              </ButtonSmall>
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
                <ButtonSmall
                  onClick={() => handleEditClick(user)}
                  color="yellow"
                >
                  edit
                </ButtonSmall>
                <ButtonSmall
                  onClick={() => handleDeleteClick(user.id)}
                  color="red"
                >
                  delete
                </ButtonSmall>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UserTable;
