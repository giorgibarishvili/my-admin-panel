import { ReactNode } from "react";

export interface ModalProps {
  title: string;
  message?: string;
  onClose: () => void;
  children?: ReactNode;
}
