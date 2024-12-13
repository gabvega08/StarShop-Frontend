import SettingsComponent from "@/components/settings/SettingsComponent";
import NavbarComponent from "@/components/ui/NavBarComponent";

export default function ProfilePage() {
  return (
    <>
      <NavbarComponent />
      {/* Dear maintainer, here you can put this component in the layout, so you wouldn't have to paste in each component */}
      <SettingsComponent />
    </>
  );
}
