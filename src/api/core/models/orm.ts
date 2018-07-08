import { UserActivation } from './user-activation.model';
import { Collection, UserCollection } from './collection.model';
import { sequlize } from './../../architecture/sequelize';
import { User } from './user.model';

sequlize.addModels([
  User,
  UserActivation,
  Collection,
  UserCollection
]);

export const orm = sequlize;
