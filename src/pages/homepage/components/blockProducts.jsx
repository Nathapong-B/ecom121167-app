import Card from "./card";

export default function BlockProducts(props) {
    const { products } = props;

    const addToCart = (item) => {
        props.returnData(item);
    };

    const viewProductDetail = (item) => {
        props.returnViewProduct(item);
    };

    return (
        <div className={props.style ? props.style : "block-grid"}>
            {/* <div className="block-grid"> */}
            {products
                ? products.map((e, i) => (
                    <div key={i} className="min-w-20 max-w-80 p-1 sm:p-2">
                        <Card style={"hover:card-box-shadow"}>
                            <div onClick={() => viewProductDetail(e)} className="max-w-full flex justify-center bg-white py-2 sm:px-2 sm:py-4 cursor-pointer">
                                <img src={e?.Image?.length > 0 ? `${e.Image[0].url}` : ''} className="min-h-16 h-32 object-contain" ></img>
                            </div>

                            <div className="flex justify-between items-center pt-2 w-full">

                                <div className="w-3/4">
                                    <div className="card-title w-full">{e.product_name.toUpperCase()}</div>

                                    <div className="card-body w-full">
                                        <div className="text-overflow text-xs text-gray-500 pe-2 w-full">{e.description}</div>
                                    </div>
                                </div>

                                <div className="pe-2">
                                    <button onClick={() => addToCart(e)} className="bo-btn-add bg-sky-500 w-max">
                                        <i className="fa-solid fa-cart-arrow-down fa-sm"></i>
                                    </button>
                                </div>

                            </div>

                            <div className="card-footer pt-2 pb-4 text-red-500 text-center text-xl font-bold">
                                <div>{e.price.toLocaleString('th-TH')} .-</div>
                            </div>
                        </Card>
                    </div>
                ))
                : <></>
            }
            {/* </div> */}
        </div>
    )
};