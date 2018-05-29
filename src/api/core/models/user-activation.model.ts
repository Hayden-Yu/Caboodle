import { User } from './user.model';
import { Table, Model, AllowNull, IsUUID, Column, Sequelize, PrimaryKey, CreatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table
export class UserActivation extends Model<UserActivation> {
  @AllowNull(false)
  @IsUUID(4)
  @PrimaryKey
  @Column(Sequelize.UUID)
  id: string;

  @CreatedAt
  creationDate: Date;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user;

  findUser(): Promise<UserActivation> {
    return new Promise((resolve, reject) => {
      if (this.user) {
        resolve(this);
      }
      if (!this.userId) {
        reject('No user is associated to this object');
      }
      User.findById(this.userId)
      .then(user => {
        this.user = user;
        resolve(this);
      })
      .catch(reject);
    });
  }
}
