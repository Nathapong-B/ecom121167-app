import { useShallow } from "zustand/react/shallow";
import { useEcomStore } from "../../../ecomStore/useEcomStore";
import { useEffect } from "react";
import BlockProducts from "./blockProducts";
import { useCartStore } from "../../../ecomStore/useCartStore";
import { toast } from "react-toastify";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function ProductsBestSeller(props) {
    const { pBestSeller, callListProductsBy } = useEcomStore(useShallow(s => ({
        pBestSeller: s.pBestSeller,
        callListProductsBy: s.actionListProductsBy,
    })));
    const { addToCart } = useCartStore(useShallow(s => ({
        addToCart: s.actionAddToCart,
    })));
    const nav = useNavigate();

    const callProducts = async () => {
        const res = await callListProductsBy(6, 'bestseller');
        res.error ? alert(`${res.error.message}`) : '';
        // res.success ? props.load({ bestseller: true }) : '';
    };

    useEffect(() => {
        if (!pBestSeller) {
            callProducts();
        }
        // else {
        //     props.load({ bestseller: true });
        // };
    }, []);

    const hdlAddToCart = (data) => {
        const res = addToCart(data);

        if (res.error) toast.warning(res.error.message);

        if (res.success) toast.success(res.success.message);
    };

    const viewProductDetail = (item) => {
        const { id } = item;
        const store = 'pBestSeller';

        nav({
            pathname: '/main/product-detail',
            search: createSearchParams({ pid: `${id}`, store }).toString()
        });
    };
    
    return (
        <div className="md:ms-1">
            <div className="block-title bg-gradient-to-r from-red-500 from-30% to-red-500/0 to-90% text-white py-2 md:rounded-tl-lg">Best seller - สินค้าขายดี</div>
            <BlockProducts products={pBestSeller} returnData={hdlAddToCart} returnViewProduct={viewProductDetail} />
        </div>
    )
};