import { useShallow } from "zustand/react/shallow";
import { useEcomStore } from "../../../ecomStore/useEcomStore";
import { useEffect } from "react";
import BlockProducts from "./blockProducts";
import { useCartStore } from "../../../ecomStore/useCartStore";
import { toast } from "react-toastify";
import { createSearchParams, useNavigate } from "react-router-dom";

// Placeholder data for Best Sellers
const placeholderBestSellers = Array.from({ length: 6 }).map((_, i) => ({
    id: `placeholder-bs-${i}`,
    product_name: `Best Seller Placeholder ${i + 1} (Fallback)`,
    price: 950 + i * 75, // Different prices again
    Image: [{ url: `https://via.placeholder.com/300x300.png?text=Best+${i + 1}` }],
    isFallback: true,
}));

export default function ProductsBestSeller(props) {
    // Get relevant states from the store
    const { pBestSeller, pBestSellerLoading, pBestSellerError, callListProductsBy } = useEcomStore(useShallow(s => ({
        pBestSeller: s.pBestSeller,
        pBestSellerLoading: s.pBestSellerLoading,
        pBestSellerError: s.pBestSellerError,
        callListProductsBy: s.actionListProductsBy,
    })));
    const { addToCart } = useCartStore(useShallow(s => ({
        addToCart: s.actionAddToCart,
    })));
    const nav = useNavigate();

    useEffect(() => {
        // Call API only if data isn't already loaded or loading/error
        if (!pBestSeller && !pBestSellerLoading && !pBestSellerError) {
            callListProductsBy(6, 'bestseller');
        }
    }, [pBestSeller, pBestSellerLoading, pBestSellerError, callListProductsBy]); // Added dependencies

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
    
    // Determine which product list to display
    const displayProducts = pBestSellerError 
        ? placeholderBestSellers 
        : pBestSeller?.slice(0, 6) || []; // Use slice or empty array

    // Loading Skeleton Component (same as before)
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 shadow animate-pulse">
                    <div className="h-48 bg-gray-300 rounded mb-4"></div> 
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div> 
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div> 
                </div>
            ))}
        </div>
    );

    return (
        <div className="md:ms-1">
            <div className="block-title bg-gradient-to-r from-red-500 from-30% to-red-500/0 to-90% text-white py-2 md:rounded-tl-lg">Best seller - สินค้าขายดี</div>
             {/* Conditional Rendering: Show Skeleton on loading, error, or no data */}
             {(pBestSellerLoading || pBestSellerError || (!pBestSellerLoading && !pBestSeller?.length)) ? (
                <LoadingSkeleton />
            ) : (
                <BlockProducts products={displayProducts} returnData={hdlAddToCart} returnViewProduct={viewProductDetail} />
            )}
        </div>
    )
};