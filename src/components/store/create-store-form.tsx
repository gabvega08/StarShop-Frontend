"use client";
import React, { useState } from "react";
import StarShopLanding from "../../../public/starshop-logos/StarShop-Logo-Landing.svg";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { UploadCloud, ImagePlus } from "lucide-react";

const CreateStorePage: React.FC = () => {
  const [storeData, setStoreData] = useState({
    storeName: "",
    storeDescription: "",
    storeCategory: "", // ✅ Se agregó este estado para la categoría
    wallet: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleBrowse = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  return (
    <main className="flex min-h-screen w-full justify-center items-center p-6">
      <section className="flex flex-col items-center text-white w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">

        {/* Logo */}
        <Image src={StarShopLanding} alt="StarShop Logo" width={128} height={98} />

        {/* Título */}
        <h1 className="text-3xl font-bold mt-2 text-center">Create your store</h1>

        <p className="text-gray-400 text-sm md:text-base opacity-70 text-center mb-8">
          Set up your store profile and start selling
        </p>

        {/* Formulario */}
        <div className="w-full space-y-6">

          {/* Store Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold tracking-wide text-[#FFFFFF] uppercase">
              Store Name
            </label>
            <Input
              id="storeName"
              type="text"
              placeholder="My Awesome Store"
              name="storeName"
              value={storeData.storeName}
              onChange={handleChange}
            />
          </div>


          {/* Store Description */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold tracking-wide text-[#FFFFFF] uppercase">
              Store Description
            </label>
            <Textarea
              id="storeDescription"
              placeholder="Tell customers about your store..."
              name="storeDescription"
              value={storeData.storeDescription}
              onChange={handleChange}
            />
          </div>


          {/* Store Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Store Category</label>
            <select
              name="storeCategory"
              value={storeData.storeCategory}
              onChange={handleChange}
              className="bg-[#0E0E1B] border-[1px] border-[rgba(168,85,247,0.2)] text-[#9CA3AF] p-3 w-full rounded-md outline-none focus:border-[#A855F7] transition"
            >
              <option value="select_category" >Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Living</option>
            </select>
          </div>


          {/* Store Logo Upload */}
          <div
            className="w-full h-56 border-4 border-dashed border-[rgba(168,85,247,0.2)] p-6 text-center rounded-md flex flex-col items-center justify-center cursor-pointer transition focus:border-[#A855F7] bg-transparent"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="text-gray-300 text-sm flex flex-col items-center">
                <p className="mb-2">Uploaded: <strong>{file.name}</strong></p>
                <img src={URL.createObjectURL(file)} alt="Preview" className="max-w-[150px] max-h-[150px] rounded-lg mt-2" />
                <div className="flex gap-2 mt-3">
                  <label htmlFor="file-upload" className="px-4 py-1 bg-purple-600 text-white text-xs rounded cursor-pointer hover:bg-purple-700 transition">
                    Change
                  </label>
                  <button onClick={() => setFile(null)} className="px-4 py-1 bg-red-500 text-white text-xs rounded cursor-pointer hover:bg-red-600 transition">
                    Remove
                  </button>
                </div>
                <input id="file-upload" type="file" accept="image/png, image/jpeg, image/gif" className="hidden" onChange={handleBrowse} />
              </div>
            ) : (
              <>
                <ImagePlus size={40} className="text-gray-400 mb-2" />
                <p className="text-gray-300 text-sm">Drag and drop your store logo here, or <label htmlFor="file-upload" className="text-purple-400 cursor-pointer">browse</label></p>
                <input id="file-upload" type="file" accept="image/png, image/jpeg, image/gif" className="hidden" onChange={handleBrowse} />
              </>
            )}
          </div>


          {/* Stellar Wallet Address */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold tracking-wide text-[#FFFFFF] uppercase">
              Stellar Wallet Address
            </label>
            <Input
              id="wallet"
              type="text"
              placeholder="G..."
              name="wallet"
              value={storeData.wallet}
              onChange={handleChange}
            />
          </div>


          <Button
            className="w-full h-12 bg-[#9333EA] hover:bg-[#A855F7] text-white text-lg font-semibold rounded-[6px] shadow-[0_0_20px_#A855F7] transition-all">
            Create Store
          </Button>


        </div>
      </section>
    </main >
  );
};

export default CreateStorePage;
