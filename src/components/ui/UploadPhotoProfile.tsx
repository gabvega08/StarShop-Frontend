import { Edit, UserRound } from "lucide-react";
import Image from "next/image";
import { useState, ChangeEvent } from "react";

export default function UploadPhotoProfile(): JSX.Element {
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative">
          {logo ? (
            <Image
              src={logo}
              alt="Profile Image"
              width={120}
              height={120}
              className="rounded-full border cursor-pointer"
              onClick={() => document.getElementById("logoInput")?.click()}
            />
          ) : (
            <div
              className="w-[120px] h-[120px] rounded-full border bg-transparent flex items-center justify-center text-gray-500 cursor-pointer"
              onClick={() => document.getElementById("logoInput")?.click()}
            >
              <span className="text-2xl"><UserRound size={51} className="text-white"/></span>
            </div>
          )}
          <button
            type="button"
            onClick={() => document.getElementById("logoInput")?.click()}
            className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full"
          >
            <Edit />
          </button>
        </div>
        <input
          id="logoInput"
          type="file"
          className="hidden"
          onChange={handleLogoChange}
        />
      </div>
    </>
  );
}
