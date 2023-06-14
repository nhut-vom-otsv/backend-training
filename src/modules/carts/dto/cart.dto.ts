import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;
}
