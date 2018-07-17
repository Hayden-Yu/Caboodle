// tslint:disable-next-line:max-line-length
import { Table, Model, PrimaryKey, Column, Sequelize, Unique, BelongsTo, BelongsToMany, AllowNull, Default, CreatedAt, ForeignKey, IsUUID } from 'sequelize-typescript';
import { Collection, UserCollection } from './collection.model';
import { User } from './user.model';
import { SequenceEqualOperator } from 'rxjs/internal/operators/sequenceEqual';

@Table
export class Forum extends Model<Forum> {

  @Column(Sequelize.STRING(16))
  title: string;

  @Column(Sequelize.STRING(16))
  description: string;

  @CreatedAt
  createdDate: Date;

  @ForeignKey(() => User)
  @Column(Sequelize.INTEGER)
  user_id: number;

  @BelongsTo(() => User)
  user;

  findUser(): Promise<Forum> {
    return new Promise((resolve, reject) => {
      if (this.user) {
        resolve(this);
      }
      if (!this.user_id) {
        reject('No user is associated to this object');
      }
      User.findById(this.user_id).then(user => {
        this.user = user;
        resolve(this);
      }).catch(reject);
    });
  }
  createArticle(topic: string, desc: string): void {
    this.title = topic;
    this.description = desc;
    this.user_id = 1;
  }
}


