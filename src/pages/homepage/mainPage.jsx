import { useEffect, useRef, useState } from "react";
import Header from "./components/header";
import ProductsNewArrival from "./components/pNewarrival";
import ProductsBestSeller from "./components/pBestSeller";
import ProductRecommend from "./components/pRecommend";
import StickyBoxCart from "./components/stickyBoxCart";
import { useEcomStore } from "../../ecomStore/useEcomStore";
import { useShallow } from "zustand/shallow";
import { useOutletContext } from "react-router-dom";

export default function MainPage() {
    const [scrollTopEl, setScrollTop] = useState(0);
    const [clientHeightEl, setClientHeight] = useState(document.documentElement.clientHeight);
    const scrollRestoration = history.scrollRestoration;
    const mainRef = useRef();
    const hdlOutletContext = useOutletContext();

    useEffect(() => {
        hdlOutletContext('Home')

        window.addEventListener('scroll', () => {
            const {
                scrollTop,
                clientHeight,
            } = document.documentElement;

            setScrollTop(() => scrollTop);
            setClientHeight(() => clientHeight);
        });
    }, []);

    const stickyTop = () => {
        const pt = scrollTopEl - clientHeightEl;
        if (pt > 0) {
            return pt;
        }
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
                    <div className="w-full md:pe-0 md:w-9/12 h-max flex flex-col flex-wrap items-center">
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

                        <div className="block-display">
                            <div className="block-title w-max">ช้อปตามหมวดหมู่</div>
                            <img src="/mouse.png" className="w-8 h-8"></img>
                        </div>

                    </div>

                    {/* rigth box */}
                    <div className="z-30 hidden md:block md:w-3/12 mt-2">
                        <div className="sticky-top m-auto w-3/4 transition-all ease-out duration-1000">
                            <StickyBoxCart />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
};