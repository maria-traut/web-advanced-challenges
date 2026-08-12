export interface ICategory {
  name: string;
  description?: string;
}

export interface IProduct {
  readonly id: string;
  name: string;
  price: number;
  stockCount: number;
  category: ICategory;
}

export function isInStock(product: IProduct): boolean {
  return product.stockCount > 0;
}
