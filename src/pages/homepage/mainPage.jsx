import { useEffect, useRef, useState } from "react";
import Header from "./components/header";
import ProductsNewArrival from "./components/pNewarrival";
import ProductsBestSeller from "./components/pBestSeller";
import ProductRecommend from "./components/pRecommend";
import StickyBoxCart from "./components/stickyBoxCart";
import { useOutletContext } from "react-router-dom";
import RenderFirstView from "../util/firstViewComponents/renderFirstView";

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

    const hdlScroll = () => {
        const {
            scrollTop,
            clientHeight,
        } = document.documentElement;

        const path = window.location.pathname
        if (path !== "/" && path !== "/main") {
            window.removeEventListener('scroll', hdlScroll);
            return true;
        };

        setScrollTop(() => scrollTop);
        setClientHeight(() => clientHeight);

        setMainContentsHeight(mainContentsRef.current.clientHeight)
        seStickyBoxHeight(stickyBoxRef.current.clientHeight)

    };

    useEffect(() => {
        hdlOutletContext('Home')

        window.addEventListener('scroll', hdlScroll);
    }, []);

    const stickyTop = () => {
        // ระยะที่กล่องจะห่างจากขอบด้านบน เท่ากับ ระยะของ scroll ที่เลื่อนลงมาลบกับความสูงของหน้าจอแสดงผล(ค่าของรูปภาพ header เต็มหน้าจอ)
        const pt = scrollTopEl - clientHeightEl;
        // จุดที่ให้กล่องหยุด ความสูงของ maincontents ลบด้วยความสูงของกล่อง
        const stopPoint = mainContentsHeight - stickyBoxHeight;

        // ถ้า pt มีค่ามากกว่าหรือเท่ากับ stopPoint ให้คืนค่า stopPoint เพื่อไม่ให้กล่องเลื่อนทะลุความสูงของ maincontents
        if (pt >= (stopPoint - 40)) return stopPoint;

        // ถ้าระยะ scroll เลื่อนลงมาเกินขนาดมากกว่า 1หน้าจอแสดงผล(หมายถึงผ่านจากส่วนของ header มาแล้ว) ให้เริ่มใช้ค่า pt
        if (pt > 0) return pt + 40;

        return 0;
    };

    root.style.setProperty('--stickyTop', `${(stickyTop())}px`);

    return (
        <div ref={mainRef} className="flex flex-wrap justify-center relative h-max">

            {/* main contents */}
            <div id='main_contents' className="relative t-hscreen w-full h-max flex flex-wrap justify-center transition-all ease-[cubic-bezier(0,50,99,0)] duration-300 z-20">

                {/* Header takes full screen height initially */}
                <div className="w-full h-screen ">
                    <Header />
                </div>

                {/* Added padding-top to create space below Header */}
                {/* Added max-width container for content sections */}
                <div className="w-full max-w-6xl flex flex-col items-center px-4 pt-16 sm:pt-24">

                    {/* Added margin-bottom to space out sections */}
                    <section ref={mainContentsRef} className="w-full h-max mb-16 sm:mb-24">
                        <RenderFirstView threshold={0} className="min-h-[500px] block-display">
                            <ProductRecommend />
                        </RenderFirstView>
                    </section>

                    {/* Added margin-bottom to space out sections */}
                    <section className="w-full h-max mb-16 sm:mb-24">
                        <RenderFirstView threshold={0} className="min-h-[500px] block-display">
                            <ProductsNewArrival />
                        </RenderFirstView>
                    </section>

                    {/* Added margin-bottom to space out sections */}
                    <section className="w-full h-max mb-16 sm:mb-24">
                        <RenderFirstView threshold={0} className="min-h-[500px] block-display">
                            <ProductsBestSeller />
                        </RenderFirstView>
                    </section>

                    {/* Commented out the unused right box section */}
                    {/* <div className="z-30 hidden md:block md:w-3/12 ">
                        <div className="sticky-top m-auto w-3/4 transition-all ease-out duration-1000">
                            <div ref={stickyBoxRef}>
                                <StickyBoxCart />
                            </div>
                        </div>
                    </div> */}

                </div>

            </div>

        </div>
    )
};