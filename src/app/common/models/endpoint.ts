export class Endpoint {
  _id?: number;
  name?: string;
  url: string;
  method: string;
  headers?: Param[];
  body?: {
    type: 'raw' | 'form-data';
    raw?: string;
    formData?: Param[];
  };
}

export class Param {
  key: string;
  value: string;
}
