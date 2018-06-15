import { Endpoint } from './endpoint';

export class Collection {
  id: number;
  name: string;
  category: string;
  tag: string;
  website: string;
  description: string;
  endpoints: Endpoint;
}
