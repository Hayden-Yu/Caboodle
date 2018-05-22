// tslint:disable-next-line:max-line-length
import { Table, Model, PrimaryKey, Column, Sequelize, Unique, IsEmail, HasMany, BelongsToMany, NotNull, Default } from 'sequelize-typescript';
import { Collection, UserCollection } from './collection.model';

@Table
export class User extends Model<User> {
  @NotNull
  @IsEmail
  @Unique
  @Column(Sequelize.STRING(64))
  email: string;

  @NotNull
  @Column(Sequelize.STRING(64))
  password: string;

  @Column(Sequelize.STRING(16))
  firstName: string;

  @Column(Sequelize.STRING(16))
  lastName: string;

  @NotNull
  @Default(true)
  @Column(Sequelize.BOOLEAN)
  active: boolean;

  @BelongsToMany(() => Collection, () => UserCollection)
  collections: Collection[];
}
