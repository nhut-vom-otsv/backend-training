import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AddressesService } from './addresses.service';
import { AddressController } from './addresses.controller';
import { Address } from './address.entity';

@Module({
  imports: [SequelizeModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressesService],
})
export class AddressModule {}
