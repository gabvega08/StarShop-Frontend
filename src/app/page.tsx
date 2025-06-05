"use client";
import FAQCategories from "@/components/features/user/faq/FAQCategories";
import LandingPageComponent from "@/components/landing-page/LandingComponent";
import { Modal } from "@/components/ui/Modal";
import { Dropdown } from "@/components/ui/sampleDropDown";
import { useState } from "react";


export default function LadingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(false);
  };
  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  return (
    <>
      <div>
        <button
          className="absolute top-4 right-4 py-2 px-4 border-primary-purple rounded-md text-white capitalize bg-gray-800"
          onClick={() => setIsOpen(true)}
        >
          open modal
        </button>
      </div>
      <LandingPageComponent />
      <FAQCategories />
      <Modal isOpen={isOpen} onClose={handleOpenModal} />
      <div className="absolute top-8">
        <Dropdown
          dropDownIsOpen={openDropdown}
          handleClose={handleOpenDropdown}
        />
      </div>
    </>
  );
}
