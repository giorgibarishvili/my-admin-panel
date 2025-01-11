import { ReactNode } from "react";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  role: string;
  password: string;
  username: string;
}
export interface ModalProps {
  title: string;
  message?: string;
  onClose: () => void;
  children?: ReactNode;
}
