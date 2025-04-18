import { createSearchParams, Link, useOutletContext } from "react-router-dom";
import ProductRecommend from "../homepage/components/pRecommend";
import { useEffect } from "react";

export default function CompletePage() {
    const hdlOutletContext = useOutletContext();

    // document.title = 'Completed';
    useEffect(() => {
        hdlOutletContext('Completed');
    }, []);

    return (
        <div className="w-full max-w-4xl m-auto">

            <div className="w-full h-max m-auto content-center my-4 py-8 rounded rounded-lg box-shadow-normal">
                <div className="text-center font-bold text-3xl">PAYMENT COMPLETED</div>
                <div className="py-4 my-4 text-6xl text-green-600">
                    <div className="w-[150px] h-[150px] m-auto flex justify-center items-center ronded rounded-full border-2 border-green-500">
                        <i className="fa-solid fa-check fa-2xl"></i>
                    </div>
                </div>
                <div className="text-center my-2 text-sm">
                    {/* <Link to={'/profile/my-purchase'}> */}
                    <Link to={{
                        pathname: '/profile/my-purchase',
                        search: createSearchParams({ ms: 'payment-completed' }).toString()
                    }}>
                        <button className="bo-btn-add bg-red-400 me-2 py-1">ไปหน้าประวัติคำสั่งซื้อ</button>
                    </Link>

                    <Link to={'/main'}>
                        <button className="bo-btn-add bg-sky-500 py-1">กลับหน้าหลัก</button>
                    </Link>
                </div>
            </div>

            <div className="w-full justify-items-center py-4">
                <div className="block-display">
                    <ProductRecommend />
                </div>
            </div>

        </div>
    )
};