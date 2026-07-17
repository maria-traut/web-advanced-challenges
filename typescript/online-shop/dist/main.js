import { orderTotal, formatOrder } from "./orders.js";
import { isInStock } from "./products.js";
const product1 = {
    id: "2ac",
    name: "Soy Sauce",
    price: 4,
    stockCount: 35,
    category: { name: "Asian Kitchen" },
};
const product2 = {
    id: "5ac",
    name: "Hot Curry Powder",
    price: 3,
    stockCount: 17,
    category: { name: "Asian Kitchen" },
};
const customer1 = {
    id: 101,
    name: "Robin",
    email: "robin.fisch@neu.de",
};
const order1 = {
    customer: customer1,
    lineItems: [
        { product: product1, quantity: 47 },
        { product: product2, quantity: 2 },
    ],
    status: "confirmed",
};
console.log(orderTotal(order1));
console.log(formatOrder(order1));
console.log(isInStock(product1));
//# sourceMappingURL=main.js.map