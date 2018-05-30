import { UserActivation } from './user-activation.model';
import { EndpointHeader } from './endpoint.model/endpoint-header.model';
import { Collection, UserCollection } from './collection.model';
import { sequlize } from './../../architecture/sequelize';
import { User } from './user.model';
import { Endpoint } from './endpoint.model';

sequlize.addModels([
  User,
  UserActivation,
  Collection,
  UserCollection,
  Endpoint,
  EndpointHeader
]);

export const orm = sequlize;
