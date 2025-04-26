export default function Header() {
    return (
        <div className="relative h-max w-full">
            <div className="relative bg-gray-900 h-screen w-full">
                <div className="relative max-w-6xl h-full flex justify-start items-center mx-auto">

                    <div className="absolute bg-gradient-to-r from-gray-100 to-gray-100/0 md:from-gray-100/0 md:statice w-1/2 text-4xl font-black text-center text-gray-200 z-20">

                        <div className="flex justify-center min-w-max">

                            <div className="relative">
                                <span className="absolute -top-[65px] italic text-9xl text-red-500">e</span>
                            </div>
                            <div className="ps-[60px]">
                                <span className="me-2 text-yellow-400">-com</span>
                                <span>SHOP</span>
                            </div>

                        </div>

                        <div className="text-gray-500 text-xs">Shop review.</div>
                    </div>

                    <div className="ml-auto z-10">
                        <img src="/pngegg.png" className="w-[650px]"></img>
                    </div>

                </div>
            </div>
        </div>
    )
};