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

export function orderTotal(order: IOrder): number {
  return; // the total price across all line items
}

export function formatOrder(order: IOrder): string {
  return; // a readable summary of the order
}

// `${order.customer.name} has ordered ${order.lineItems}. The order status is ${order.status}.`;
