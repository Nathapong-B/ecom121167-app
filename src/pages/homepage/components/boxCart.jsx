import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { getImgPosition0 } from "../../util/utilProduct";

export default function BoxCart(props) {
    const { cart } = props;
    const nav = useNavigate();

    const viewProductDetail = (item) => {
        console.log(item)
        const { id } = item;
        const store = 'cart';

        nav({
            pathname: '/main/product-detail',
            search: createSearchParams({ pid: `${id}`, store }).toString()
        });
    };

    return (
        <div className="box-float right-0">
            <div>สินค้าเพิ่มเข้ามาล่าสุด</div>
            <hr className="border-gray-300 my-2"></hr>
            {cart.length > 0
                ?
                <div>
                    <ul>
                        {cart.map((e, i) => (
                            <li key={i}>
                                <div className="min-w-[400px] max-w-[400px] flex">
                                    <div className="flex-1 flex gap-2 min-w-[200px]">
                                        <div className="h-8 min-w-[25px] max-w-[25px]">
                                            <img src={getImgPosition0(e.Image)[0].url} onClick={() => viewProductDetail(e)} className="object-contain cursor-pointer"></img>
                                        </div>

                                        <div onClick={() => viewProductDetail(e)} className="text-overflow cursor-pointer">{e.product_name.toUpperCase()}</div>
                                    </div>
                                    <div className="w-[50px] text-center">{e.qty}</div>
                                    <div className="min-w-[80px] max-w-[80px] text-end">{e.price.toLocaleString('th-TH')}.-</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <hr className="border-gray-300 my-2"></hr>
                    <div className="text-end">
                        <div className="inline text-end cursor-pointer text-gray-500 hover:text-blue-500">
                            <Link to={'/main/cart'}>เพิ่มเติม..-&#62;</Link>
                        </div>
                    </div>
                </div>
                :
                <div>ยังไม่มีสินค้าในตะกร้า</div>
            }
        </div>
    )
};