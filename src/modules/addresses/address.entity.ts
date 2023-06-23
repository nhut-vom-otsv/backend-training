import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { TimestampBaseModel } from 'src/shared';

@Table({ tableName: 'addresses' })
export class Address extends TimestampBaseModel<Address> {
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, field: 'user_id', allowNull: false })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'house_number',
  })
  houseNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ward: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  district: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;
}
