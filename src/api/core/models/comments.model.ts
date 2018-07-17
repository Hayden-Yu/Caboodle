// tslint:disable-next-line:max-line-length
import { Table, Model, PrimaryKey, Column, Sequelize, Unique, BelongsTo, BelongsToMany, AllowNull, Default, CreatedAt, ForeignKey, IsUUID } from 'sequelize-typescript';
import { Collection, UserCollection } from './collection.model';
import { User } from './user.model';
import { Forum } from './forum.model';
import { SequenceEqualOperator } from 'rxjs/internal/operators/sequenceEqual';

@Table
export class Comments extends Model<Comments> {

    @AllowNull(false)
    @IsUUID(4)
    @PrimaryKey
    @Column(Sequelize.UUID)
    id: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    user_id: number;

    @AllowNull(false)
    @ForeignKey(() => Forum)
    @Column
    thread_id: number;

    @Column(Sequelize.STRING(16))
    description: string;

    @CreatedAt
    timestamps: Date;

    @BelongsTo(() => User)
    user;

    findUser(): Promise<Comments> {
        return new Promise((resolve, reject) => {
          if (this.user) {
            resolve(this);
          }
          if (!this.user_id) {
            reject('No user is associated to this object');
          }
          User.findById(this.user_id)
          .then(user => {
            this.user = user;
            resolve(this);
          })
          .catch(reject);
        });
    }
}
