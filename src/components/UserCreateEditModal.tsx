import React, { useState } from "react";
import Modal from "./Modal";
import { Input } from "./Input";
import { ModalProps, User } from "../models/UserModels";
import { ButtonSmall } from "./ButtonSmall";

function UserCreateEditModal({
  title,
  message,
  onClose,
  children,
  user,
  onSave,
}: ModalProps & { user: User | null; onSave: (user: User) => void }) {
  const [ID, setID] = useState(user?.id || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [password, setPassword] = useState(user?.password || "");
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [age, setAge] = useState(user?.age || "");
  const [role, setRole] = useState(user?.role || "");

  const handleSave = () => {
    const userToSave = {
      id: Number(ID),
      firstName,
      lastName,
      password,
      email,
      username,
      age: Number(age),
      role,
    };
    onSave(userToSave);
  };

  return (
    <Modal title={title} onClose={() => onClose()} message={message}>
      <div className="grid grid-cols-2 gap-4">
        <Input
          value={ID}
          onChange={(e) => setID(e.target.value)}
          className="mt-5 w-60"
          placeholder="ID"
          type="number"
        />
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-5 w-60"
          placeholder="First name"
          type="text"
        />
        <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-5 w-60"
          placeholder="Last name"
          type="text"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-5 w-60"
          placeholder="Password"
          type="password"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-5 w-60"
          placeholder="Email"
          type="email"
        />
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-5 w-60"
          placeholder="Username"
          type="text"
        />
        <Input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mt-5 w-60"
          placeholder="Age"
          type="number"
        />
        <Input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-5 w-60"
          placeholder="Role"
          type="text"
        />
        <ButtonSmall
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600"
        >
          Save
        </ButtonSmall>
        <ButtonSmall onClick={onClose} className="bg-red-500 hover:bg-red-600">
          Cancel
        </ButtonSmall>
      </div>
      {children}
    </Modal>
  );
}
export default UserCreateEditModal;
