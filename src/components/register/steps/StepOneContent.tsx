import { User, Mail, MapPin } from "lucide-react";
import UploadPhotoProfile from "@/components/ui/UploadPhotoProfile";

export default function StepOneContent(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center w-full space-y-6">
            <UploadPhotoProfile />

            <div className="flex flex-col items-center justify-center w-full p-6 bg-[#0F102C] rounded-[3rem] shadow-lg border-4 border-[#3D3C75]">
                <div className="w-full space-y-6">
                    <div className="flex flex-col w-full mt-2">
                        <label className="text-white text-sm text-center font-bold mb-2">USERNAME</label>
                        <div className="flex items-center w-full px-4 py-2 bg-[#282A36] rounded-md relative">
                            <User className="w-5 h-5 text-purple-400" />
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="flex-1 ml-4 text-sm text-white placeholder-gray-400 bg-transparent focus:outline-none"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7649CB] rounded-b-md"></div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="text-white text-sm text-center font-bold mb-2">EMAIL</label>
                        <div className="flex items-center w-full px-4 py-2 bg-[#282A36] rounded-md relative">
                            <Mail className="w-5 h-5 text-purple-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 ml-4 text-sm text-white placeholder-gray-400 bg-transparent focus:outline-none"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7649CB] rounded-b-md"></div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="text-white text-center text-sm font-bold mb-2">LOCATION</label>
                        <div className="flex items-center w-full px-4 py-2 bg-[#282A36] rounded-md relative">
                            <MapPin className="w-5 h-5 text-purple-400" />
                            <input
                                type="text"
                                placeholder="Enter your location"
                                className="flex-1 ml-4 text-sm text-white placeholder-gray-400 bg-transparent focus:outline-none"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7649CB] rounded-b-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
