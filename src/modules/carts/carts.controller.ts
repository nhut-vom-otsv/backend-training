import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartOutput } from './interfaces/card-output.interface';
import { CartDto } from './dto/cart.dto';
import { Cart } from './cart.entity';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get(':userId')
  async getCartByUserId(@Param('userId') userId: string): Promise<CartOutput> {
    return await this.cartsService.getCart(userId);
  }

  @Post()
  async addToCart(
    @Body() body: CartDto,
  ): Promise<Cart | [affectedCount: number]> {
    const { userId, productId, quantity } = body;
    return await this.cartsService.addProductToCart(
      userId,
      productId,
      quantity,
    );
  }

  @Patch('increaseOne')
  async increaseQuantity(
    @Query('userId') userId: string,
    @Query('productId') productId: string,
  ): Promise<void> {
    return await this.cartsService.increaseProductQuantityByOne(
      userId,
      productId,
    );
  }

  @Patch('decreaseOne')
  async decreaseQuantity(
    @Query('userId') userId: string,
    @Query('productId') productId: string,
  ): Promise<void> {
    return await this.cartsService.decreaseProductQuantityByOne(
      userId,
      productId,
    );
  }

  @Delete()
  async deleteProductFromCart(
    @Query('userId') userId: string,
    @Query('productId') productId: string,
  ): Promise<number> {
    return await this.cartsService.removeProductFromCart(userId, productId);
  }

  @Delete('clear/:userId')
  async clearCart(@Param('userId') userId: string): Promise<number> {
    return await this.cartsService.clearCart(userId);
  }
}
