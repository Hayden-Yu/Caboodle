import { UserActivation } from './user-activation.model';
import { Collection, UserCollection } from './collection.model';
import { sequlize } from './../../architecture/sequelize';
import { User } from './user.model';
import { Forum } from './forum.model';
import { Comments } from './comments.model';
import { Contact } from './contact.model';

sequlize.addModels([
  User,
  UserActivation,
  Collection,
  UserCollection,
  Forum,
  Comments,
  Contact,
]);

export const orm = sequlize;
