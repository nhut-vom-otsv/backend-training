import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './cart.entity';
import { Product } from '../products/product.entity';
import { createCartResponse } from './utils/createCartResponse';
import { CartOutput } from './interfaces/card-output.interface';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart)
    private readonly cartModel: typeof Cart,
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async addProductToCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart | [affectedCount: number]> {
    const cartProduct = await this.cartModel.findOne({
      where: { userId, productId },
    });

    if (cartProduct)
      return await this.cartModel.update(
        { quantity: cartProduct.quantity + quantity },
        { where: { userId, productId } },
      );

    return await this.cartModel.create({ userId, productId, quantity });
  }

  async getCart(userId: string): Promise<CartOutput> {
    const cart = await this.cartModel.findAll({ where: { userId } });

    const productIds = cart.map((item) => item.productId);
    const productList = await this.productModel.findAll({
      where: { id: productIds },
    });

    return createCartResponse(cart, productList);
  }

  async removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<number> {
    return await this.cartModel.destroy({ where: { userId, productId } });
  }

  async clearCart(userId: string): Promise<number> {
    return await this.cartModel.destroy({ where: { userId } });
  }

  async increaseProductQuantityByOne(
    userId: string,
    productId: string,
  ): Promise<void> {
    const cartItem = await this.cartModel.findOne({
      where: { userId, productId },
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    }
  }

  async decreaseProductQuantityByOne(
    userId: string,
    productId: string,
  ): Promise<void> {
    const cartItem = await this.cartModel.findOne({
      where: { userId, productId },
    });

    if (cartItem) {
      cartItem.quantity -= 1;

      if (cartItem.quantity <= 0) {
        await cartItem.destroy();
      } else {
        await cartItem.save();
      }
    }
  }
}
