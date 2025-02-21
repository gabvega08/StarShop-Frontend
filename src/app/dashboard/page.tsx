import DashboardComponent from "@/components/dashboard/DashboardComponent"
import NavbarComponent from "@/components/ui/NavBarComponent"
import CreateUserForm from "@/components/user/create-user-form"

export default function DashboardPage() {
    return (
        <>
            <NavbarComponent />
            <DashboardComponent />
            <CreateUserForm />
        </>
    )
}