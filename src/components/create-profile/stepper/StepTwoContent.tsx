"use client"

import { ShoppingBasket, Store } from 'lucide-react'

export default function StepTwoContent(): JSX.Element {

    return (
        <>
        <h1 className='text-3xl font-bold text-white text-center mb-8'>Choose your profile</h1>
        <div className="w-full max-w-3xl mx-auto px-[5rem] py-[4rem] rounded-3xl bg-[#0E0D2E] border-[4px] border-[#3E3A77]">
            <div className="grid grid-cols-2 gap-[4rem]">
                <button
                    className="flex flex-col items-center p-8 rounded-2xl bg-[#312E56] border-[3px] border-[#7f4fd2] transition-all" >
                    <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-[#312E56]">
                        <ShoppingBasket size={60} className=" text-white" />
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-white">Buyer</h3>
                    <p className="mt-2 text-sm text-white/60">Explore the various shops</p>
                </button>

                <button
                    className="flex flex-col items-center p-8 rounded-2xl bg-[#312E56] border-[3px] border-[#7f4fd2] transition-all"
                >
                    <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-[#312E56]">
                        <Store size={50} className=" text-white" />
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-white">Seller</h3>
                    <p className="mt-2 text-sm text-white/60">Start selling</p>
                </button>
            </div>
        </div>
        </>
    )
}

