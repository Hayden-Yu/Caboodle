import { Param } from './endpoint';

export class EndpointResponse {
  status: number;
  headers: Param;
  body: string;
}
