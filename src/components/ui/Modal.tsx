import useClickOutside from "@/hooks/useClickOutside";
import { FC, useRef } from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Modal Title</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
