import { Model, PrimaryKey, Column, Sequelize, BelongsTo, HasMany, Table, ForeignKey, NotNull } from 'sequelize-typescript';
import { Collection } from './collection.model';
import { EndpointHeader } from './endpoint.model/endpoint-header.model';

export const methods = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'COPY',
  'HEAD',
  'OPTIONS',
  'LINK',
  'UNLINK',
  'PURGE',
  'LOCK',
  'UNLOCK',
  'PROPFIND',
  'VIEW'
];

@Table
export class Endpoint extends Model<Endpoint> {
  @NotNull
  @Column(Sequelize.STRING)
  name: string;

  @NotNull
  @Column(Sequelize.STRING)
  url: string;

  @NotNull
  @Column(Sequelize.ENUM(methods))
  method: string;

  @HasMany(() => EndpointHeader)
  headers: EndpointHeader[];

  @ForeignKey(() => Collection)
  @Column
  collectionId: number;
  @BelongsTo(() => Collection)
  collection: Collection;
}


