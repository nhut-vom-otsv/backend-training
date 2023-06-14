import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './cart.entity';
import { Product } from '../products/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([Cart, Product])],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
