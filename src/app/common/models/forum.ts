import { User } from './user';
export class Forum {
    id?: number;
    title: string;
    description: string;
    createdDate?: Date;
    user_id: number;
    user?: User;
}
