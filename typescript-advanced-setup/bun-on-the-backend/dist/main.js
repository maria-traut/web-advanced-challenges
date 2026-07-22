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
const product3 = {
    id: "7ac",
    name: "Ginger",
    price: 3.5,
    stockCount: 0,
    category: { name: "Asian Kitchen" },
};
const customer1 = {
    id: 101,
    name: "Robin",
    email: "robin.fisch@neu.de",
};
const customer2 = {
    id: 102,
    name: "Julien",
    email: "julien.fisch@neu.de",
};
const order1 = {
    customer: customer1,
    lineItems: [
        { product: product1, quantity: 47 },
        { product: product2, quantity: 2 },
    ],
    status: "confirmed",
};
const order2 = {
    customer: customer2,
    lineItems: [
        { product: product1, quantity: 1 },
        { product: product2, quantity: 30 },
        { product: product3, quantity: 5 },
    ],
    status: "shipped",
};
console.log(orderTotal(order1));
console.log(orderTotal(order2));
console.log(formatOrder(order1));
console.log(formatOrder(order2));
console.log(isInStock(product1));
console.log(isInStock(product2));
console.log(isInStock(product3));
//# sourceMappingURL=main.js.map