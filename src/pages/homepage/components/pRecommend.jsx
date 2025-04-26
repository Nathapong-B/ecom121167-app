import { useEffect, useState } from "react"
import { useEcomStore } from "../../../ecomStore/useEcomStore";
import { useShallow } from "zustand/react/shallow";
import BlockProducts from "./blockProducts";
import { useCartStore } from "../../../ecomStore/useCartStore";
import { toast } from "react-toastify";
import { createSearchParams, useNavigate } from "react-router-dom";

// Placeholder data structure - now indicates fallback status in name
const placeholderProducts = Array.from({ length: 6 }).map((_, i) => ({
    id: `placeholder-${i}`,
    product_name: `Placeholder Product ${i + 1} (Fallback)`,
    price: 1000 + i * 100,
    Image: [{ url: `https://via.placeholder.com/300x300.png?text=Product+${i + 1}` }], // Placeholder image URL
    isFallback: true, // Add a flag to identify fallback items
}));

export default function ProductRecommend(props) {
    // Get loading and error states from the store
    const { products, productsLoading, productsError, callListProduct } = useEcomStore(useShallow(s => ({
        products: s.products,
        productsLoading: s.productsLoading,
        productsError: s.productsError,
        callListProduct: s.actionCallListProduct,
    })));
    const { addToCart } = useCartStore(useShallow((s) => ({
        addToCart: s.actionAddToCart,
    })));
    const nav = useNavigate();

    useEffect(() => {
        // Optionally trigger API call here if it's ONLY needed for this component
        // and not called by a parent/on initial load
        if (!products && !productsLoading && !productsError) {
             callListProduct(6);
         }
        // Removed dependency on local state
    }, [products, productsLoading, productsError, callListProduct]); // Added dependencies

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

    // Determine which product list to display
    const displayProducts = productsError
        ? placeholderProducts // Use placeholder data on error
        : products?.slice(0, 6) || []; // Use slice on products or empty array

    // Re-introducing Loading Skeleton Component
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 shadow animate-pulse">
                    <div className="h-48 bg-gray-300 rounded mb-4"></div> {/* Image Placeholder */}
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Title Placeholder */}
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div> {/* Price Placeholder */}
                </div>
            ))}
        </div>
    );

    return (
        <div className="md:ms-1">
            <div className="block-title bg-gradient-to-r from-sky-500 from-30% to-red-500/0 to-90% text-white py-2 md:rounded-tl-lg">Recommend - สินค้าแนะนำ</div>
            {/* Conditional Rendering: Skeleton on Loading, Fallback Cards on Error, Real Cards on Success */}
            {productsLoading ? (
                <LoadingSkeleton /> // Show Skeleton Cards while loading
            ) : productsError ? (
                 // Render BlockProducts with fallback data (indicates fallback)
                <BlockProducts products={placeholderProducts} returnData={hdlAddToCart} returnViewProduct={viewProductDetail} />
            ) : (
                 // Render BlockProducts with actual data
                <BlockProducts products={displayProducts} returnData={hdlAddToCart} returnViewProduct={viewProductDetail} />
            )}
        </div >
    )
};