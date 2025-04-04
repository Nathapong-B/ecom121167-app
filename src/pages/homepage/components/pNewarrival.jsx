import { useShallow } from "zustand/react/shallow"
import { useEcomStore } from "../../../ecomStore/useEcomStore"
import { useEffect } from "react";
import BlockProducts from "./blockProducts";
import { useCartStore } from "../../../ecomStore/useCartStore";
import { toast } from "react-toastify";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function ProductsNewArrival(props) {
    const { pNewArrival, callListProductsBy } = useEcomStore(useShallow(s => ({
        pNewArrival: s.pNewArrival,
        callListProductsBy: s.actionListProductsBy,
    })));
    const { addToCart } = useCartStore(useShallow(s => ({
        addToCart: s.actionAddToCart,
    })));
    const nav = useNavigate();

    const callProducts = async () => {
        const res = await callListProductsBy(6, 'newarrival');
        res.error ? alert(`${res.error.message}`) : '';
        // res.success ? props.load({ newarrival: true }) : '';
    };

    useEffect(() => {
        if (!pNewArrival) {
            callProducts();
        }
        // else {
        //     props.load({ newarrival: true });
        // };
    }, []);

    const hdlAddToCart = (data) => {
        const res = addToCart(data);

        if (res.error) toast.warning(res.error.message);

        if (res.success) toast.success(res.success.message);
    };

    const viewProductDetail = (item) => {
        const { id } = item;
        const store = 'pNewArrival';

        nav({
            pathname: '/main/product-detail',
            search: createSearchParams({ pid: `${id}`, store }).toString()
        });
    };
    
    return (
        <div>
            <div className="block-title bg-gradient-to-r from-green-500 from-30% to-red-500/0 to-90% text-white py-2 rounded-tl-lg">New arrival - สินค้ามาใหม่</div>
            <BlockProducts products={pNewArrival} returnData={hdlAddToCart} returnViewProduct={viewProductDetail} />
        </div>
    )
};