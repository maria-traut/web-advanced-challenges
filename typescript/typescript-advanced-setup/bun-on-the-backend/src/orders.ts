import type { IProduct } from "./products.js";

export interface ICustomer {
  readonly id: number;
  name: string;
  email: string;
}

export interface IOrder {
  customer: ICustomer;
  lineItems: ILineItem[];
  status: "pending" | "confirmed" | "shipped";
}

export interface ILineItem {
  product: IProduct;
  quantity: number;
}

// the total price across all line items
export function orderTotal(order: IOrder): number {
  const totalCost = order.lineItems.reduce((totalCost, lineItem) => {
    return totalCost + lineItem.product.price * lineItem.quantity;
  }, 0);
  return totalCost;
}

// a readable summary of the order
export function formatOrder(order: IOrder): string {
  const orderedProducts = order.lineItems.map(
    (lineItem) => `${lineItem.quantity}x ${lineItem.product.name}`,
  );
  const lastItem = orderedProducts[orderedProducts.length - 1];
  const otherItems = orderedProducts.slice(0, -1);
  const formattedList =
    otherItems.length > 0
      ? `${otherItems.join(", ")} and ${lastItem}`
      : lastItem;
  return `${order.customer.name} has ordered ${formattedList}. Order status: ${order.status}.`;
}
