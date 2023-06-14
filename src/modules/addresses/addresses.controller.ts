import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressDto } from './dto/address.dto';
import { Address } from './address.entity';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post(':userId')
  async createAddress(
    @Body() addressDto: AddressDto,
    @Param('userId') userId: string,
  ): Promise<Address> {
    return this.addressesService.createAddress(userId, addressDto);
  }

  @Get(':userId')
  async getAddressById(@Param('userId') userId: string): Promise<Address[]> {
    return this.addressesService.getAddressesByUserId(userId);
  }

  @Patch(':id')
  async updateAddress(
    @Param('id') id: string,
    @Body() addressDto: AddressDto,
  ): Promise<Address> {
    return this.addressesService.updateAddress(id, addressDto);
  }

  @Delete(':id')
  async deleteAddress(@Param('id') id: string): Promise<void> {
    return this.addressesService.deleteAddress(id);
  }
}
