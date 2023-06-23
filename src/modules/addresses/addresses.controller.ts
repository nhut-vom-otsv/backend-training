import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UserData } from 'src/decorators/user-data.decorator';
import { AddressesService as AddressService } from './addresses.service';
import { AddressDto } from './dto/address.dto';
import { Address } from './address.entity';
import { JwtAuthGuard } from 'src/middleware/guards/jwt-auth.guard';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressesService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() addressDto: AddressDto,
    @UserData('id') userId: string,
  ): Promise<Address> {
    return this.addressesService.create(userId, addressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(
    @UserData('id') userId: string,
    @Param('id') id: string,
  ): Promise<Address> {
    const address = await this.addressesService.get(id);

    if (address.userId !== userId)
      throw new UnauthorizedException('Invalid user');

    return address;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getByUserId(@UserData('id') userId: string): Promise<Address[]> {
    return this.addressesService.getListByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() addressDto: AddressDto,
  ): Promise<Address> {
    return this.addressesService.update(id, addressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.addressesService.delete(id);
  }
}
