import { Product } from 'src/modules/products/product.entity';

export interface CartItem {
  quantity: number;
  product: Product;
}

export interface CartOutput {
  cartValue: number;
  cartList: {
    [productId: string]: CartItem;
  };
}
