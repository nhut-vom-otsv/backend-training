import { Product } from 'src/modules/products/product.entity';
import { Cart } from '../cart.entity';
import { CartItem, CartOutput } from '../interfaces/card-output.interface';

export const createCartResponse = (
  productList: Cart[],
  productDetailsList: Product[],
): CartOutput => {
  const cartValue = productList.reduce((total, item) => {
    const product = productDetailsList.find((p) => p.id === item.productId);
    if (product) {
      return total + product.price * item.quantity;
    }
    return total;
  }, 0);

  const fixedCartValue = Number(cartValue.toFixed(2));

  const cartList: { [productId: string]: CartItem } = {};
  for (const item of productList) {
    const product = productDetailsList.find((p) => p.id === item.productId);
    if (product) {
      cartList[item.productId] = {
        quantity: item.quantity,
        product,
      };
    }
  }

  const output: CartOutput = {
    cartValue: fixedCartValue,
    cartList,
  };

  return output;
};
