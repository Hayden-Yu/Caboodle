import { Model, PrimaryKey, Column, Sequelize, BelongsTo, Table, ForeignKey, AllowNull, Default } from 'sequelize-typescript';
import { Endpoint } from '../endpoint.model';

@Table
export class EndpointHeader extends Model<EndpointHeader> {
  @AllowNull(false)
  @Column(Sequelize.STRING)
  name: string;

  @Column(Sequelize.STRING)
  defaultValue: string;

  @AllowNull(false)
  @Default(false)
  @Column(Sequelize.BOOLEAN)
  isParam: boolean;

  @Column(Sequelize.BOOLEAN)
  isMandatory: boolean;

  @ForeignKey(() => Endpoint)
  @Column
  endpointId: number;
  @BelongsTo(() => Endpoint)
  collection: Endpoint;
}
