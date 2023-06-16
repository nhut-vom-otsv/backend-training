import { Column, DataType, Table } from 'sequelize-typescript';
import { TimestampBaseModel } from 'src/constants';

@Table({ tableName: 'categories', timestamps: false })
export class Category extends TimestampBaseModel<Category> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
