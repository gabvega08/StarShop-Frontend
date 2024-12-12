"use client";
import SettingsComponent from "@/components/settings/SettingsComponent";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
export default function ProfilePage() {
  return (
    <>
      <LoadingSpinner />
      <SettingsComponent />
    </>
  );
}
