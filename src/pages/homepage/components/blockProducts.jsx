import Card from "./card";

export default function BlockProducts(props) {
    const { products } = props;
    const arrDummy = Array(6).fill(null);

    const addToCart = (item) => {
        props.returnData(item);
    };

    const viewProductDetail = (item) => {
        props.returnViewProduct(item);
    };

    const loadingCard = (i) => {
        return (
            <div key={i} className="min-w-20 max-w-80 p-2">
                <Card style={"hover:card-box-shadow"}>
                    <div className="max-w-full flex justify-center bg-white py-2 sm:px-2 sm:py-4 cursor-pointer animate-pulse">
                        <div className="min-h-16 h-[128px] w-full bg-gray-300" ></div>
                    </div>

                    <div className="flex justify-between items-center pt-2 w-full animate-pulse">

                        <div className="w-3/4 px-1">
                            <div className="card-title w-full h-[20px] bg-gray-300"></div>

                            <div className="card-body w-full mt-1">
                                <div className="text-overflow text-xs text-gray-500 pe-2 w-full h-[10px] bg-gray-300"></div>
                            </div>
                        </div>

                        <div className="pe-2">
                            <div className="h-[20px] w-[50px] bg-gray-300"></div>
                        </div>

                    </div>

                    <div className="card-footer pt-2 pb-4 text-red-500 text-center animate-pulse">
                        <div className="h-[20px] w-[100px] bg-gray-300 m-auto"></div>
                    </div>
                </Card>
            </div>
        )
    };

    return (
        <div className={props.style ? props.style : "block-grid"}>
            {/* <div className="block-grid"> */}

            {products
                ? products.map((e, i) => (
                    <div key={i} className="min-w-20 max-w-80 p-2">
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
                : arrDummy.map((e,i) => {
                    return loadingCard(i);
                })
            }
            {/* </div> */}
        </div>
    )
};