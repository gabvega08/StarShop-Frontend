import useClickOutside from "@/hooks/useClickOutside";
import { FC, useRef } from "react";
interface DropdownProps {
  dropDownIsOpen: boolean;
  handleClose: () => void;
}
export const Dropdown: FC<DropdownProps> = ({
  dropDownIsOpen,
  handleClose,
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, handleClose);

  return (
    <div className="relative  py-2 px-4 border-primary-purple rounded-md text-white capitalize bg-gray-800">
      <div className="select-none" onClick={handleClose}>
        open dropdown
      </div>
      {dropDownIsOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-48"
        >
          <ul className="text-black [&>li]:px-2 space-y-3 [&>li]:text-sm [&>li]:font-medium">
            <li>list item</li>
            <li>list item</li>
            <li>list item</li>
            <li>list item</li>
            <li>list item</li>
          </ul>
        </div>
      )}
    </div>
  );
};
