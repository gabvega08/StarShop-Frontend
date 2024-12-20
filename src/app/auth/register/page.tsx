import RegisterComponent from '@/components/register/RegisterComponent'
import Link from 'next/link'
import Image from "next/image"

export default function RegisterPage() {
    return (
        <>
            <div className='mt-8'>
                <RegisterComponent />
            </div>
        </>
    )
}