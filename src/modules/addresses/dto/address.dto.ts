import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false })
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  houseNumber?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ward: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  district: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  country: string;
}
