"use client"

import { useState } from "react"
import { Edit, Camera, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"

interface UserProfileData {
  name: string
  email: string
  stellarAddress: string
  phone: string
  location: string
  bio: string
  avatar: string
}

const mockUserData: UserProfileData = {
  name: "John Doe",
  email: "john.doe@example.com",
  stellarAddress: "GABC1234567890XYZ...",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  bio: "Passionate about blockchain technology and digital commerce.",
  avatar: "/images/user-profile/avatar.jpg"
}

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState<UserProfileData>(mockUserData)
  const [tempData, setTempData] = useState<UserProfileData>(mockUserData)

  const handleEdit = () => {
    setTempData(userData)
    setIsEditing(true)
  }

  const handleSave = () => {
    setUserData(tempData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempData(userData)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof UserProfileData, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          <p className="text-gray-400">Manage your account information and preferences</p>
        </div>
        {!isEditing ? (
          <Button onClick={handleEdit} className="flex items-center gap-2">
            <Edit size={16} />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save size={16} />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
              <X size={16} />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <div className="lg:col-span-1">
          <div className="bg-[#0E0E1B] rounded-lg border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Profile Picture</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white/10"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors">
                    <Camera size={16} className="text-white" />
                  </button>
                )}
              </div>
              {isEditing && (
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="lg:col-span-2">
          <div className="bg-[#0E0E1B] rounded-lg border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                {isEditing ? (
                  <Input
                    value={tempData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                  />
                ) : (
                  <p className="text-white">{userData.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                {isEditing ? (
                  <Input
                    value={tempData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                  />
                ) : (
                  <p className="text-white">{userData.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Phone</label>
                {isEditing ? (
                  <Input
                    value={tempData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                  />
                ) : (
                  <p className="text-white">{userData.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Location</label>
                {isEditing ? (
                  <Input
                    value={tempData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                  />
                ) : (
                  <p className="text-white">{userData.location}</p>
                )}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-300">Stellar Address</label>
                {isEditing ? (
                  <Input
                    value={tempData.stellarAddress}
                    onChange={(e) => handleInputChange('stellarAddress', e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                  />
                ) : (
                  <p className="text-white font-mono text-sm">{userData.stellarAddress}</p>
                )}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-300">Bio</label>
                {isEditing ? (
                  <textarea
                    value={tempData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full h-24 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-300">{userData.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-[#0E0E1B] rounded-lg border border-white/10 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Security Settings</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-medium">Change Password</h3>
              <p className="text-gray-400 text-sm">Update your account password</p>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-medium">Two-Factor Authentication</h3>
              <p className="text-gray-400 text-sm">Add an extra layer of security</p>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </div>
      </div>
    </div>
  )
} 