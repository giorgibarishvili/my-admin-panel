import axios from "axios";
import { User } from "../models/UserModel";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await axios.get<{ users: User[] }>(
      "https://dummyjson.com/users"
    );
    return res.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
