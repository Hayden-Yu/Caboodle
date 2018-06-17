import { Endpoint } from './endpoint.model';
import { User } from './user.model';
import { Table, Model, Column, Sequelize, ForeignKey, HasMany, AllowNull } from 'sequelize-typescript';

@Table
export class Collection extends Model<Collection> {
  @AllowNull(false)
  @Column(Sequelize.STRING)
  name: string;

  @Column(Sequelize.STRING)
  category: string;

  @Column(Sequelize.STRING)
  tag: string;

  @Column(Sequelize.STRING)
  website: string;

  @Column(Sequelize.STRING)
  description: string;

  @HasMany(() => Endpoint)
  endpoints: Endpoint[];
}

@Table
export class UserCollection extends Model<UserCollection> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Collection)
  @Column
  collectionId: number;
}
