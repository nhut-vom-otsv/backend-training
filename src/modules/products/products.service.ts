import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { IdDto } from '../users/dto/id.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    return await this.productModel.create(product);
  }

  async createBulk(products: CreateProductDto[]): Promise<Product[]> {
    return this.productModel.bulkCreate(products);
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.findAll();
  }

  async findOne(id: IdDto): Promise<Product> {
    const product = await this.productModel.findOne({ where: { id: id } });

    if (product) return product.dataValues;

    throw new Error('Product not found');
  }

  async update(id: IdDto, updateProductDto: UpdateProductDto): Promise<number> {
    const [affectedCount] = await this.productModel.update(updateProductDto, {
      where: { id: id },
    });

    return affectedCount;
  }

  async remove(id: IdDto): Promise<number> {
    return this.productModel.destroy({ where: { id: id } });
  }
}