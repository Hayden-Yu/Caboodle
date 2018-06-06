import { Collection } from './collection';

export class User {
  email: string;
  firstName?: string;
  lastName?: string;
  collections?: Collection[];
}
