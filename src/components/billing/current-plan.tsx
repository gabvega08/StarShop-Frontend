

export function CurrentPlan() {
    return (
        <section 
            className="w-full max-w-[50rem] p-5 bg-black/10 rounded-lg flex flex-col justify-start items-start
            border border-white border-opacity-20 custom-white-shadow"
        >
            <h3 className="text-white text-xl font-medium pb-5">Current Plan</h3>
            <div className="w-full rounded-lg p-5 gap-5 bg-violet-600/15 flex flex-col justify-start items-start">
                <div className="w-full flex flex-col justify-start items-start gap-5 md:flex-row md:justify-between md:items-center md:gap-0">
                    <div className="flex flex-col justify-start items-start">
                        <h4 className="text-xl text-white font-medium">Premium Store Plan</h4>
                        <p className="text-gray-500 pt-1">Unlimited products, priority support, and advanced analytics</p>
                    </div>
                    <div className="flex flex-col gap-2 justify-start items-start md:items-center">
                        <p className="text-xl text-violet-400 font-semibold">50 XML / month</p>
                        <button className="p-3 text-white bg-black/50 rounded-lg">Change Plan</button>
                    </div>
                </div>
                <div className="h-[1px] bg-violet-500/25 w-full"></div>
                <p className="text-sm text-gray-500">Next billing date: April 1,2024</p>
            </div>
        </section>
    );
}