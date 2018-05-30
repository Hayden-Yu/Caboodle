// tslint:disable-next-line:max-line-length
import { Table, Model, PrimaryKey, Column, Sequelize, Unique, IsEmail, HasMany, BelongsToMany, AllowNull, Default } from 'sequelize-typescript';
import { Collection, UserCollection } from './collection.model';
import * as crypto from 'crypto';

@Table({
  timestamps: true
})
export class User extends Model<User> {
  @AllowNull(false)
  @IsEmail
  @Unique
  @Column(Sequelize.STRING(64))
  email: string;

  @Column(Sequelize.STRING)
  password: string;

  @Column(Sequelize.STRING(32))
  salt: string;

  @Column(Sequelize.STRING(16))
  firstName: string;

  @Column(Sequelize.STRING(16))
  lastName: string;

  @AllowNull(false)
  @Default(false)
  @Column(Sequelize.BOOLEAN)
  active: boolean;

  @BelongsToMany(() => Collection, () => UserCollection)
  collections: Collection[];

  setPassword(password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 127, 'sha512').toString('hex');
  }

  validatePassword(password: string) {
    return this.password === crypto.pbkdf2Sync(password, this.salt, 10000, 127, 'sha512').toString('hex');
  }
}
