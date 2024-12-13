import { User, Mail, MapPin } from "lucide-react";
import UploadPhotoProfile from "@/components/ui/UploadPhotoProfile";

export default function StepOneContent(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center w-full space-y-6">
            <UploadPhotoProfile />

            <div className="flex flex-col items-center justify-center w-full px-14 pt-8 pb-14 bg-[#0F102C] rounded-[3rem] shadow-lg border-4 border-[#3D3C75]">
                <div className="w-full space-y-4">
                    <div className="flex flex-col w-full mt-0">
                        <label className="text-white text-lg text-center font-bold italic mb-2">USERNAME</label>
                        <div className="flex items-center w-full px-4 py-2 bg-[#302F54] rounded-md relative">
                            <User className="w-5 h-5 text-white" />
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="flex-1 ml-4 text-sm text-white placeholder-white bg-transparent text-center focus:outline-none"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7649CB] rounded-b-md"></div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="text-white text-lg text-center font-bold italic mb-2">EMAIL</label>
                        <div className="flex items-center w-full px-4 py-2 bg-[#302F54] rounded-md relative">
                            <Mail className="w-5 h-5 text-white" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 ml-4 text-sm text-white placeholder-white bg-transparent text-center focus:outline-none"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7649CB] rounded-b-md"></div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full mb-16">
                        <label className="text-white text-lg text-center font-bold italic mb-2">LOCATION</label>
                        <div className="flex items-center w-full px-4 py-2 bg-[#302F54] rounded-md relative">
                            <MapPin className="w-5 h-5 text-white" />
                            <input
                                type="text"
                                placeholder="Enter your location"
                                className="flex-1 ml-4 text-sm text-white placeholder-white bg-transparent text-center focus:outline-none"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7649CB] rounded-b-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
