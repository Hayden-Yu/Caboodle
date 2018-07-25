// tslint:disable-next-line:max-line-length
import { Table, Model, Column, Sequelize, Unique, IsEmail, HasMany, BelongsToMany, AllowNull, Default } from 'sequelize-typescript';
import * as crypto from 'crypto';

@Table({
  timestamps: true
})
export class Contact extends Model<Contact> {
  @AllowNull(false)
  @IsEmail
  @Unique

  @Column(Sequelize.STRING(16))
  firstName: string;

  @Column(Sequelize.STRING(16))
  lastName: string;

  @Column(Sequelize.STRING(64))
  email: string;

  @Column(Sequelize.STRING)
  topic: string;

  @Column(Sequelize.STRING(512))
  message: string;



  @AllowNull(false)
  @Default(false)
  @Column(Sequelize.BOOLEAN)
  active: boolean;


}
