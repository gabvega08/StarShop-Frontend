import RegisterComponent from "@/components/create-profile/RegisterComponent"
import Link from 'next/link'
import Image from "next/image"
import StarShop from "../../../../public/starshop-logos/StarShop-Logo.svg"

export default function RegisterPage() {
    return (
        <>
            <header className="mt-2">
                <div className="ml-12">
                    <Link href="/" className="inline-block">
                        <Image
                            src={StarShop}
                            alt="StarShop Logo"
                            width={120}
                            height={40}
                        />
                    </Link>
                </div>
            </header>
            <RegisterComponent />
        </>
    )
}