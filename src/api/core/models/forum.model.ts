// tslint:disable-next-line:max-line-length
import { Table, Model, PrimaryKey, Column, Sequelize, Unique, HasMany, BelongsToMany, AllowNull, Default } from 'sequelize-typescript';
import { Collection, UserCollection } from './collection.model';
import * as crypto from 'crypto';
import { SequenceEqualOperator } from 'rxjs/internal/operators/sequenceEqual';

@Table
export class Forum extends Model<Forum> {
    @Column(Sequelize.STRING(16))
    subject: string;
}
