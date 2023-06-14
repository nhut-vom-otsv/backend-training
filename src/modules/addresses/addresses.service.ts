import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './address.entity';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address)
    private addressModel: typeof Address,
  ) {}

  async createAddress(
    userId: string,
    addressDto: AddressDto,
  ): Promise<Address> {
    return this.addressModel.create({ ...addressDto, userId });
  }

  async getAddressesByUserId(userId: string): Promise<Address[]> {
    return this.addressModel.findAll({ where: { userId } });
  }

  async updateAddress(id: string, addressDto: AddressDto) {
    await this.addressModel.update(addressDto, { where: { id } });
    return this.addressModel.findOne({ where: { id } });
  }

  async deleteAddress(id: string): Promise<void> {
    await this.addressModel.destroy({ where: { id } });
  }
}
