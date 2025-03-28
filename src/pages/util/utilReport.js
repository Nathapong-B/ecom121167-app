// cost/order => input 1 order
export const sumCost = (order) => {
    //order > OrderDetail[x] > cost*quantity
    return order.OrderDetail.reduce((acc, cur) => acc += (cur.cost * cur.quantity), 0);
};