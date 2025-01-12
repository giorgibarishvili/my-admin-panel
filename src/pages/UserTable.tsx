import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";
import Header from "../components/Header";
import { User } from "../models/UserModels";
import Modal from "../components/Modal";
import axios from "axios";
import UserCreateEditModal from "../components/UserCreateEditModal";
import { ButtonSmall } from "../components/ButtonSmall";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [userCreateOrEdit, setUserCreateOrEdit] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const usersPerPage = 10;

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        let res = [];
        if (searchQuery) {
          const response = await axios.get(
            `https://dummyjson.com/users/search?q=${searchQuery}`
          );
          res = response.data.users;
        } else {
          const response = await fetchUsers();
          res = response;
        }
        setUsers(res);
      } catch (err) {
        setError("Failed to fetch data");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [searchQuery]);

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

  const totalPages = Math.ceil(users.length / usersPerPage);
  const displayedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="overflow-x-auto">
      <Header />
      <Search onSearch={setSearchQuery} searchValue={searchQuery} />
      {userCreateOrEdit && (
        <UserCreateEditModal
          title={userToEdit ? "Edit user" : "Create user"}
          onClose={() => setUserCreateOrEdit(false)}
          message={
            userToEdit
              ? "Do you want to edit this user?"
              : "Do you want to create user?"
          }
          user={userToEdit}
          onSave={handleSaveUser}
        ></UserCreateEditModal>
      )}
      {userToDelete && (
        <Modal
          title="Delete User"
          message="Are you sure you want to delete this user?"
          onClose={() => setUserToDelete(null)}
        >
          <div>
            <ButtonSmall
              onClick={() => handleConfirmDelete()}
              className="bg-green-500 hover:bg-green-600"
            >
              Yes
            </ButtonSmall>
            <ButtonSmall
              onClick={() => setUserToDelete(null)}
              className="bg-red-500 hover:bg-red-600"
            >
              No
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
              <ButtonSmall
                onClick={() => handleCreateClick()}
                className="bg-green-500 hover:bg-green-600"
              >
                Create user
              </ButtonSmall>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center px-4 py-2 text-red-700">
                No user has found!
              </td>
            </tr>
          ) : (
            displayedUsers.map((user) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 min-w-36 max-w-48">
                  {user.firstName + " " + user.lastName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 max-w-48 min-w-36">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 min-w-36 max-w-48">
                  {user.age}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 min-w-36 max-w-48">
                  {user.role}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <ButtonSmall
                    onClick={() => handleEditClick(user)}
                    className="bg-yellow-500 hover:bg-yellow-600"
                  >
                    edit
                  </ButtonSmall>
                  <ButtonSmall
                    onClick={() => handleDeleteClick(user.id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    delete
                  </ButtonSmall>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {users.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
export default UserTable;
