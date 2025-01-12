import React, { useEffect, useRef } from "react";
import { ModalProps } from "../models/UserModels";
import Xmark from "../assets/icons/xmark-solid.svg";

function Modal({ title, message, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
        ref={modalRef}
      >
        <div className="flex items-center justify-between">
          <p className="font-medium sm:text-lg">{title}</p>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close"
          >
            <img src={Xmark} alt="close" />
          </button>
        </div>
        {message && <p className="mt-4 text-gray-500">{message}</p>}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
export default Modal;
