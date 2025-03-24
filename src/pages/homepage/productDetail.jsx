import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom"
import { getProductDetail } from "../util/utilProduct";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ImagesDisplay from "./components/imgDisplay";
import ProductRecommend from "./components/pRecommend";
import { useCartStore } from "../../ecomStore/useCartStore";
import { useShallow } from "zustand/react/shallow";

export default function ProductDetail() {
    const [searchParams] = useSearchParams();
    const pid = searchParams.get('pid');
    const store = searchParams.get('store');
    const { addToCart, addToOrder } = useCartStore(useShallow((s) => ({
        addToCart: s.actionAddToCart,
        addToOrder: s.actionAddToOrder
    })));
    const scrollRestoration = history.scrollRestoration;
    const [data, setData] = useState();
    const hdlOutletContext = useOutletContext();
    data?.Image.sort((a, b) => a.position - b.position); // sort image position
    const elDes = useRef();
    const [qty, setQty] = useState(1);
    const nav = useNavigate();

    // document.title = data?.product_name ? data.product_name.toUpperCase() : 'Product detail';

    const fetchData = async () => {
        const res = await getProductDetail(pid, store);

        if (res?.length > 0) {
            setData(res[0]);
        };

        if (res.error) return toast.error(res.error.message);

        if (res.status === 200) {
            setData(res.data.result);
        };
    };

    const hdlAddToCart = (data, count) => {
        const res = addToCart(data, count);

        if (res.error) toast.warning(res.error.message);

        if (res.success) toast.success(res.success.message);
    };

    const hdlIncreaseDecreaseQty = (action) => {
        const { name } = action.target;

        if (name === 'increase') {
            setQty(prev => prev >= data.stock ? data.stock : prev + 1);
        };

        if (name === 'decrease') {
            setQty(prev => prev <= 1 ? 1 : prev - 1)
        };
    };

    const hdlBuynow = (item, count) => {
        item.qty = count;
        const items = [item];

        addToOrder(items);
        nav('/main/order');
    };

    data?.product_name ? hdlOutletContext(data.product_name.toUpperCase()) : hdlOutletContext('Product detail');

    useEffect(() => {
        // ไม่ต้องให้คืนค่า scroll อัตโนมัติ เมื่อมีการรีโหลดหน้าเพจ เพื่อให้จัดการ scrollTop ด้วยตนเอง
        if (scrollRestoration === "auto") {
            history.scrollRestoration = "manual";
        };

        window.document.documentElement.scrollTop = 0;

        fetchData();
        setQty(1);
    }, [pid]);

    if (data && elDes.current) {
        // elDes.current.innerText = data.description
        // elDes.current.innerHTML=data.description
    };

    return (
        <div className="w-full max-w-6xl m-auto px-2">
            {/* <div className="w-full max-w-4xl m-auto px-2"> */}

            {data
                ? <div className="w-full min-h-max m-auto mt-6 flex flex-col md:gap-6 md:flex-row md:flex-wrap">
                    {/* image display */}
                    <div className="w-full md:w-[500px] md:max-w-[500px]">
                        <ImagesDisplay data={data?.Image} />
                    </div>

                    {/* product description */}
                    <div className="relative w-full md:flex-1 max-h-[500px] flex flex-col gap-4 mx-auto p-2 rounded">
                        {/* <div className="relative w-full md:w-2/5 flex flex-col mx-auto p-2 bg-white rounded"> */}
                        <div className="font-bold text-2xl">{data.product_name.toUpperCase()}</div>
                        {/* <div ref={elDes} id="elDesc"></div> */}
                        <div ref={elDes} className="text-gray-400">
                            <span className="text-sm">หมวดหมู่: </span>
                            {data.Category.category_name}
                        </div>
                        <div className="w-full font-bold">
                            <span className="text-4xl">
                                <span className="text-2xl">&#3647;</span>
                                {data.price.toLocaleString('th-TH')}
                            </span>

                            <div className="mt-4 flex flex-wrap w-full">
                                <div className="me-2 text-gray-400 text-sm content-center">
                                    <span>
                                        จำนวน:
                                    </span>
                                </div>

                                <div className="flex min-w-[100px]">
                                    <button name="decrease" onClick={(e) => hdlIncreaseDecreaseQty(e)} className="rounded-s border border-red-500 w-max px-2 text-center hover:bg-red-500 hover:text-white">
                                        <i class="fa-solid fa-minus"></i>
                                    </button>
                                    <div className="flex-1 text-center bg-gray-300">{qty}</div>
                                    <button name="increase" onClick={(e) => hdlIncreaseDecreaseQty(e)} className="rounded-e border border-red-500 w-max px-2 text-center hover:bg-red-500 hover:text-white">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>

                                <div className="ms-2 flex text-sm text-red-500 font-normal items-center">
                                    <div className="me-1">stock:</div>
                                    <div>{data.stock}</div>
                                </div>

                            </div>


                            <div className="flex flex-wrap gap-2 text-center mt-4 w-full min-w-[200px]">
                                <button className="bo-btn-add bg-red-500 flex-1 min-w-[200px] py-2" onClick={() => hdlBuynow(data, qty)}>ซื้อเลย</button>
                                <button className="bo-btn-add bg-sky-500 flex-1 min-w-[200px] py-2" onClick={() => hdlAddToCart(data, qty)}>
                                    <i class="fa-solid fa-cart-arrow-down fa-lg me-2"></i>
                                    เพิ่มลงตะกร้า
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <div className="flex flex-col w-full h-[300px] lg:min-w-[200px] lg:max-w-[200px] p-2 bg-white rounded">
                        <span>คุณอาจชอบ</span>
                        <BlockProducts/>
                    </div> */}
                </div>
                : <div className="w-full h-[400px] mt-6 rounded bg-gray-300 flex items-center">

                    <div className="w-full flex p-2 justify-center">
                        <div className="font-bold">Loading product description</div>
                        <div className="relative">
                            <div className="dot1"></div>
                            <div className="dot2"></div>
                            <div className="dot3"></div>
                        </div>
                    </div>

                </div>
            }

            <div className="w-full justify-items-center py-4">
                <div className="block-display p-0">
                    <ProductRecommend />
                </div>
            </div>
        </div>
    )
};