import { Endpoint } from './endpoint.model';
import { User } from './user.model';
import { Table, Model, PrimaryKey, Column, Sequelize, ForeignKey, BelongsToMany, HasMany, NotNull } from 'sequelize-typescript';

@Table
export class Collection extends Model<Collection> {
  @NotNull
  @Column(Sequelize.STRING)
  name: string;

  @Column(Sequelize.STRING)
  genre: string;

  @Column(Sequelize.STRING)
  tag: string;

  @HasMany(() => Endpoint)
  endpoints: Endpoint[];
  // @BelongsToMany(() => User, () => UserCollection)
  // users: User[];
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
