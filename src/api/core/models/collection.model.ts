import { User } from './user.model';
import { Table, Model, Column, Sequelize, ForeignKey, AllowNull, BelongsTo } from 'sequelize-typescript';
import { IEndpoint, Endpoint } from './documents/endpoint.doc';

@Table({
  timestamps: true,
  getterMethods: {
    endpoints() {
      return this._endpoints;
    }
  }
})
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

  @ForeignKey(() => User)
  @Column(Sequelize.INTEGER)
  createdBy: number;

  @BelongsTo(() => User)
  creator: User;

  _endpoints: IEndpoint[];

  getEndpoints(lean?: boolean): Promise<IEndpoint[]> {
    if (lean === undefined) {
      lean = false;
    }
    const qry = Endpoint.find({ collectionId: this.id });
    return lean ? qry.lean().exec() : qry.exec();
  }

  async attatchEndpoints() {
    this._endpoints = await this.getEndpoints(true);
    if (this._endpoints) {
      for (const el of this._endpoints) {
        el.__v = undefined;
      }
    }
  }
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
