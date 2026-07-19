const product1 = {
  id: 1,
  name: "Soy Sauce",
  price: 4,
  stockCount: 35,
};
const lineItem1 = { product: "Vinegar", quantity: 47 };
const lineItem2 = { product: "Olive Oil", quantitiy: 2 };
const order1 = {
  customer: { id: 101, name: "Robin", email: "robin.fisch@neu.de" },
  lineItems: [lineItem1, lineItem2],
  status: "conirmed",
};
export function orderTotal(order) {
  return order.lineItems.product.price;
}
export function formatOrder(order) {
  return `${order.customer.name} has ordered ${order.lineItems}. The order status is ${order.status}.`;
}
export function isInStock(product) {
  return product.stockCount > 0;
}
console.log(orderTotal(order1));
console.log(formatOrder(order1));
console.log(isInStock(product1));
//# sourceMappingURL=types.js.map
