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
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export interface SearchProps {
  onSearch: (value: string) => void;
  searchValue: string;
}
