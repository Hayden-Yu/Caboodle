import * as mongoose from 'mongoose';
import { IParam, IEndpoint, ParamSchema } from './endpoint.doc';
import logger from '../../../architecture/logger';


export interface IEndpointHistory extends mongoose.Document {
  status: number;

  userId: number;

  body?: string;

  headers?: IParam[];

  createdAt?: Date;

  endpoint?: IEndpoint;
}

export const EndpointHistorySchema = new mongoose.Schema({
  status: { type: Number, required: true },
  userId: { type: Number, required: true },
  body: String,
  headers: [ParamSchema],
  endpoint: { type: mongoose.Schema.Types.ObjectId, ref: 'Endpoint'}
}, { timestamps: { createdAt: true } });
EndpointHistorySchema.pre('save', function(next) {
  logger.debug(`mongo saving ${this}`);
  next();
});

export const EndpointHistory: mongoose.Model<IEndpointHistory> = mongoose.model<IEndpointHistory>('EndpointHistory', EndpointHistorySchema);
