import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomepageCover(props) {

    const onHover = () => {
        const el = document.querySelector('#elLine.top-full');
        el.classList.replace('top-full', '-top-full');
    };

    const onOut = () => {
        const el = document.querySelector('#elLine.-top-full');
        el.classList.replace('-top-full', 'top-full');
    };

    const onSlideCover = () => {
        const el = document.querySelector('#elCover.top-0');
        el.classList.replace('top-0', '-top-full');

        setTimeout(() => {
            props.close(true);
        }, 1000);
    };

    useEffect(() => {
        if (props.onClose) {
            setTimeout(() => {
                onSlideCover();
            }, 500);
        };
    }, []);

    return (
        <div id="elCover" className="bg-gray-100 w-full h-full absolute top-0 left-0 z-50 flex flex-col justify-center items-center transition-all duration-1000 ease-out">
            <div className="flex-1 flex items-center">
                <div>
                    <Link to={'/backoffice'} className="relative top-2"><span className="italic font-bold text-gray-400">goto</span><span className="font-bold text-gray-500">Back Office</span></Link>
                    <h1 className="text-4xl text-gray-500 font-black flex justify-center min-w-max">Welcome to
                        <div className="relative ps-[10px]">
                            <span className="absolute -top-[25px] italic text-7xl text-red-500">e</span>
                        </div>
                        <div className="ps-[40px]">
                            <span className="me-2 text-yellow-400">-com</span>
                            <span>SHOP</span>
                        </div>
                    </h1>
                    <div className="text-center text-gray-500 font-bold">
                        <Link to={'/auth/signin'}>Sign in</Link>
                        <span className="text-gray-400"> / </span>
                        <Link to={'/auth/register'}>Register</Link>
                    </div>
                </div>
            </div>

            {/* <div id="elBall" title="click" onMouseOver={onHover} onMouseOut={onOut} onClick={onSlideCover} className="w-14 h-14 mb-3 bg-gray-400 relative animate-bounce rounded rounded-full  flex flex-col justify-center items-center overflow-hidden cursor-pointer text-gray-300 "> */}
            <div id="elBall" title="click" onMouseOver={onHover} onMouseOut={onOut} onClick={onSlideCover} className="w-14 h-14 mb-3 bg-gray-400 relative animate-bounce rounded rounded-full  flex flex-col justify-center items-center overflow-hidden cursor-pointer text-gray-300 hover:bg-gray-300 hover:text-gray-400">
                <div className="flex flex-col justify-center items-center">
                    <div className="text-3xl relative -rotate-45">
                        {/* <i className="fa-solid fa-computer-mouse"></i> */}
                        <i className="fa-solid fa-hand-pointer"></i>
                    </div>
                    {/* <div className="relative -top-1 text-xs font-bold">click</div> */}
                </div>
                <div id="elLine" name='elLine' className="absolute bg-white/60 w-full h-4 top-full transition-all duration-500"></div>
            </div>

        </div>
    )
};