// tslint:disable-next-line:max-line-length
import { Table, Model, Column, Sequelize, BelongsTo, CreatedAt, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Forum extends Model<Forum> {

  @Column(Sequelize.TEXT)
  title: string;

  @Column(Sequelize.TEXT)
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


