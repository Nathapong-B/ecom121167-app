import { useEffect, useState } from "react"
import { useEcomStore } from "../../../ecomStore/useEcomStore";
import { useShallow } from "zustand/react/shallow";
import BlockProducts from "./blockProducts";
import { useCartStore } from "../../../ecomStore/useCartStore";
import { toast } from "react-toastify";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function ProductRecommend(props) {
    const { products, callListProduct } = useEcomStore(useShallow(s => ({
        products: s.products,
        callListProduct: s.actionCallListProduct,
    })));
    const { addToCart } = useCartStore(useShallow((s) => ({
        addToCart: s.actionAddToCart,
    })));
    const nav = useNavigate();
    const [dataProducts, setDataProducts] = useState();

    const callProducts = async () => {
        const res = await callListProduct(6);
        res.error ? alert(`${res.error.message}`) : '';
        // res.success ? props.load({ recommend: true }) : '';
    };

    const settingProductsData = () => {
        setDataProducts(() => products.slice(0, 6))
    };

    useEffect(() => {
        if (!products) {
            callProducts();
        }

        if (products) {
            settingProductsData();
        }
    }, [products]);

    const hdlAddToCart = (data) => {
        const res = addToCart(data);

        if (res.error) toast.warning(res.error.message);

        if (res.success) toast.success(res.success.message);
    };

    const viewProductDetail = (item) => {
        const { id } = item;
        const store = 'products';

        nav({
            pathname: '/main/product-detail',
            search: createSearchParams({ pid: `${id}`, store }).toString()
        });
    };

    return (
        <div className="md:ms-1">
            <div className="block-title bg-gradient-to-r from-sky-500 from-30% to-red-500/0 to-90% text-white py-2 md:rounded-tl-lg">Recommend - สินค้าแนะนำ</div>
            <BlockProducts products={dataProducts} returnData={hdlAddToCart} returnViewProduct={viewProductDetail} />
        </div >
    )
};