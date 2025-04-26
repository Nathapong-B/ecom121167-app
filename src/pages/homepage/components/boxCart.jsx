import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { getImgPosition0 } from "../../util/utilProduct";

export default function BoxCart(props) {
    const { cart } = props;
    const nav = useNavigate();

    const viewProductDetail = (item) => {
        const { id } = item;
        const store = 'cart'; // Assuming store should always be 'cart' here

        nav({
            pathname: '/main/product-detail',
            search: createSearchParams({ pid: `${id}`, store }).toString()
        });
    };

    return (
        // Apply consistent dropdown styling: white bg, rounded, shadow, ring
        <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 min-w-[300px] max-w-xs p-4">
            {/* Header */}
            <div className="text-sm font-medium text-gray-900 mb-2 pb-2 border-b border-gray-200">
                สินค้าในตะกร้า
            </div>
            
            {cart.length > 0
                ?
                <div className="space-y-3">
                    {/* Cart Items List */}
                    <ul className="space-y-3 max-h-60 overflow-y-auto pr-2"> {/* Added max height and scroll */}
                        {cart.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 hover:bg-gray-50 p-1 rounded">
                                {/* Image */}
                                <div className="flex-shrink-0 h-12 w-12 border border-gray-200 rounded-md overflow-hidden">
                                    <img 
                                        src={getImgPosition0(item.Image)[0]?.url || ''} // Handle potential missing image
                                        alt={item.product_name}
                                        onClick={() => viewProductDetail(item)} 
                                        className="h-full w-full object-cover object-center cursor-pointer"
                                    />
                                </div>
                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <p 
                                        onClick={() => viewProductDetail(item)} 
                                        className="text-xs font-medium text-gray-900 truncate cursor-pointer hover:text-blue-600"
                                    >
                                        {item.product_name.toUpperCase()}
                                    </p>
                                    <p className="text-xs text-gray-500">จำนวน: {item.qty}</p>
                                </div>
                                {/* Price */}
                                <div className="flex-shrink-0 text-xs text-gray-700 whitespace-nowrap">
                                    {item.price.toLocaleString('th-TH')}.- 
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* Footer Link/Button */}
                    <div className="pt-3 border-t border-gray-200">
                        <Link 
                            to={'/main/cart'} 
                            className="block w-full text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md py-2"
                        >
                            ดูตะกร้าสินค้าทั้งหมด
                        </Link>
                    </div>
                </div>
                :
                // Empty Cart Message
                <div className="text-center text-sm text-gray-500 py-4">
                    ยังไม่มีสินค้าในตะกร้า
                </div>
            }
        </div>
    )
};