import { EndpointHeader } from './endpoint.model/endpoint-header.model';
import { Collection, UserCollection } from './collection.model';
import { sequlize } from './../../architecture/sequelize';
import { User } from './user.model';
import { Endpoint } from './endpoint.model';

sequlize.addModels([
  User,
  Collection,
  UserCollection,
  Endpoint,
  EndpointHeader
]);

export const orm = sequlize;
