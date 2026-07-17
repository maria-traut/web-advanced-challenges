export interface IProduct {
  readonly id: number;
  name: string;
  price: number;
  stockCount: number;
}

export interface ICategory {
  name: string;
  description?: string;
  products: IProduct[];
}

export interface ICustomer {
  readonly id: number;
  name: string;
  email: string;
}

export interface IOrder {
  customer: ICustomer;
  lineItems: {
    product: IProduct;
    quantitiy: number;
  };
  status: "pending" | "confirmed" | "shipped";
}

export function orderTotal(order: IOrder): number {}

export function formatOrder(order: IOrder): string {
  return `${order.customer.name} has ordered ${order.lineItems}. The order status is ${order.status}.`;
}

export function isInStock(product: IProduct): boolean {}
