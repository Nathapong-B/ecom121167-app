import { useEffect, useRef, useState } from "react";
import Header from "./components/header";
import ProductsNewArrival from "./components/pNewarrival";
import ProductsBestSeller from "./components/pBestSeller";
import ProductRecommend from "./components/pRecommend";
import StickyBoxCart from "./components/stickyBoxCart";
import { useOutletContext } from "react-router-dom";

export default function MainPage() {
    const [scrollTopEl, setScrollTop] = useState(0);
    const [clientHeightEl, setClientHeight] = useState(document.documentElement.clientHeight);
    const scrollRestoration = history.scrollRestoration;
    const mainRef = useRef();
    const hdlOutletContext = useOutletContext();
    const mainContentsRef = useRef();
    const stickyBoxRef = useRef();
    const [mainContentsHeight, setMainContentsHeight] = useState(0);
    const [stickyBoxHeight, seStickyBoxHeight] = useState(0);

    useEffect(() => {
        hdlOutletContext('Home')

        window.addEventListener('scroll', () => {
            const {
                scrollTop,
                clientHeight,
            } = document.documentElement;

            setScrollTop(() => scrollTop);
            setClientHeight(() => clientHeight);
            setMainContentsHeight(mainContentsRef.current.clientHeight)
            seStickyBoxHeight(stickyBoxRef.current.clientHeight)
        });
    }, []);

    const stickyTop = () => {
        // ระยะที่กล่องจะห่างจากขอบด้านบน เท่ากับ ระยะของ scroll ที่เลื่อนลงมาลบกับความสูงของหน้าจอแสดงผล(ค่าของรูปภาพ header เต็มหน้าจอ)
        const pt = scrollTopEl - clientHeightEl;
        // จุดที่ให้กล่องหยุด ความสูงของ maincontents ลบด้วยความสูงของกล่อง
        const stopPoint = mainContentsHeight - stickyBoxHeight;

        // ถ้า pt มีค่ามากกว่าหรือเท่ากับ stopPoint ให้คืนค่า stopPoint เพื่อไม่ให้กล่องเลื่อนทะลุความสูงของ maincontents
        if (pt >= stopPoint) return stopPoint;

        // ถ้าระยะ scroll เลื่อนลงมาเกินขนาดมากกว่า 1หน้าจอแสดงผล(หมายถึงผ่านจากส่วนของ header มาแล้ว) ให้เริ่มใช้ค่า pt
        if (pt > 0) return pt;

        return 0;
    };

    root.style.setProperty('--stickyTop', `${(stickyTop())}px`);

    return (
        <div ref={mainRef} className="flex flex-wrap justify-center relative h-max">

            {/* main contents */}
            <div id='main_contents' className="relative t-hscreen pb-8 w-full h-max flex flex-wrap justify-center transition-all ease-[cubic-bezier(0,50,99,0)] duration-300 z-20">

                <div className="w-full h-screen mb-[60px]">
                    <Header />
                </div>

                <div className="w-full max-w-6xl flex flex-wrap justify-center">

                    {/* main contents */}
                    <div ref={mainContentsRef} className="w-full md:pe-0 md:w-9/12 h-max flex flex-col flex-wrap items-center">
                        <div className="block-display">
                            <ProductRecommend />
                        </div>

                        <div className="block-display">
                            <div className="my-6 h-[2px] bg-gradient-to-r from-red-500/0 via-gray-500 to-red-500/0"></div>
                        </div>

                        <div className="block-display">
                            <ProductsNewArrival />
                        </div>

                        <div className="block-display">
                            <div className="my-6 h-[2px] bg-gradient-to-r from-red-500/0 via-gray-500 to-red-500/0"></div>
                        </div>

                        <div className="block-display">
                            <ProductsBestSeller />
                        </div>

                        <div className="block-display">
                            <div className="my-6 h-[2px] bg-gradient-to-r from-red-500/0 via-gray-500 to-red-500/0"></div>
                        </div>

                        {/* <div className="block-display">
                            <div className="block-title w-max">ช้อปตามหมวดหมู่</div>
                            <img src="/mouse.png" className="w-8 h-8"></img>

                            <div className="ms-8 my-4 flex gap-2">
                                <div className="group relative bg-gray-300 p-[2px] w-max h-max rounded rounded-lg overflow-hidden">
                                    <div className="group-hover:animate-spin absolute top-[50%] left-[-25%] w-[150%] h-2 bg-green-500 z-0"></div>
                                    <button disabled={true} className="relative bo-btn-add bg-sky-500 btn-disabled z-10">
                                        click
                                    </button>
                                </div>
                                <div className="relative bg-gray-300 p-[2px] w-max h-max rounded rounded-lg overflow-hidden">
                                    <div className="animate-spin absolute top-[50%] left-[-25%] w-[150%] h-2 bg-sky-500 z-0"></div>
                                    <button disabled={true} className="relative bo-btn-add bg-sky-500 btn-disabled z-10">
                                        click
                                    </button>
                                </div>
                                <div className="relative bg-gray-300 p-[2px] w-max h-max rounded rounded-lg overflow-hidden">
                                    <div className="animate-spin absolute top-[50%] left-[-25%] w-[150%] h-2 bg-red-500 z-0"></div>
                                    <button disabled={true} className="relative bo-btn-add bg-sky-500 btn-disabled z-10">
                                        click
                                    </button>
                                </div>

                                <div className="relative bg-gray-300 p-[2px] w-max h-max rounded rounded-full overflow-hidden">
                                    <div className="animate-spin absolute top-[50%] left-[-25%] w-[150%] h-2 bg-green-500 z-0"></div>
                                    <button disabled={true} className="relative w-8 h-8 rounded rounded-full bg-sky-500 btn-disabled z-10">
                                        click
                                    </button>
                                </div>
                                <div className="relative bg-gray-300 p-[2px] w-max h-max rounded rounded-full overflow-hidden">
                                    <div className="animate-spin absolute top-[50%] left-[-25%] w-[150%] h-2 bg-sky-500 z-0"></div>
                                    <button disabled={true} className="relative w-8 h-8 rounded rounded-full bg-sky-500 btn-disabled z-10">
                                        click
                                    </button>
                                </div>
                                <div className="relative bg-gray-300 p-[2px] w-max h-max rounded rounded-full overflow-hidden">
                                    <div className="animate-spin absolute top-[50%] left-[-25%] w-[150%] h-2 bg-red-500 z-0"></div>
                                    <button disabled={true} className="relative w-8 h-8 rounded rounded-full bg-sky-500 btn-disabled z-10">
                                        click
                                    </button>
                                </div>
                            </div>
                        </div> */}

                    </div>

                    {/* rigth box */}
                    <div className="z-30 hidden md:block md:w-3/12 ">
                        <div className="sticky-top m-auto w-3/4 transition-all ease-out duration-1000">
                            <div ref={stickyBoxRef}>
                                <StickyBoxCart />
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
};