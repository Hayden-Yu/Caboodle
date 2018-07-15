import { Endpoint } from './endpoint';
import { User } from './user';

export class Collection {
  id: number;
  name: string;
  category: string;
  tag: string;
  website: string;
  description: string;
  endpoints: Endpoint[];
  creator?: User;
}
