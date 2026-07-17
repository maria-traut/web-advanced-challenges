export function orderTotal(order) {
    return order.lineItems.product.price;
}
export function formatOrder(order) {
    return `${order.customer.name} has ordered ${order.lineItems}. The order status is ${order.status}.`;
}
//# sourceMappingURL=orders.js.map