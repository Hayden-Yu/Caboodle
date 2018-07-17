import { User } from './user';
export class Collection {
    id: number;
    thread_id: number;
    description: string;
    timestamps: Date;
    User?: User;
}
