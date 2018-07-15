import { Collection } from './collection';

export class User {
  id?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  collections?: Collection[];
  bookmarks?: Collection[];
}
