// tslint:disable-next-line:max-line-length
import { Table, Model, Column, Sequelize, Unique, IsEmail, AllowNull, Default } from 'sequelize-typescript';

@Table({
  timestamps: true
})
export class Contact extends Model<Contact> {

  @Column(Sequelize.STRING(16))
  firstName: string;

  @Column(Sequelize.STRING(16))
  lastName: string;

  @Column(Sequelize.STRING(64))
  email: string;

  @Column(Sequelize.STRING(64))
  issue: string;

  @Column(Sequelize.STRING(512))
  message: string;

}
