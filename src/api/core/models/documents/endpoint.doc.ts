import * as mongoose from 'mongoose';

export const methods = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'COPY',
  'HEAD',
  'OPTIONS',
  'LINK',
  'UNLINK',
  'PURGE',
  'LOCK',
  'UNLOCK',
  'PROPFIND',
  'VIEW'
];

export interface IParam {
  key: string;

  value: string;

  private: boolean;
}

export const ParamSchema = new mongoose.Schema({
  key: String,
  value: String,
  private: Boolean
}, { _id: false });

export class IRequestBody {
  type: 'raw' | 'form-data';

  raw?: string;

  formData?: IParam[];
}

export const RequestBodySchema = new mongoose.Schema({
  type: { type: String, enum: ['raw', 'form-data'] },
  raw: String,
  formData: { type: Map, of: mongoose.Schema.Types.Mixed }
}, { _id: false });

export interface IEndpoint extends mongoose.Document {
  collectionId: number;

  name?: string;

  method: string;

  url: string;

  headers?: IParam[];

  query?: IParam[];

  body?: IRequestBody;
}

export const EndpointSchema = new mongoose.Schema({
  collectionId: { type: Number, index: true },
  name: String,
  method: { type: String, enum: methods },
  url: String,
  headers: [ParamSchema],
  query: [ParamSchema],
  body: RequestBodySchema
});

export const Endpoint: mongoose.Model<IEndpoint> = mongoose.model<IEndpoint>('Endpoint', EndpointSchema);
