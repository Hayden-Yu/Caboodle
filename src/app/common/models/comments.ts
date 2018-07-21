import { User } from './user';
import { Forum } from './forum';
export class Comments {
    id?: number;
    thread_id: number;
    description: string;
    timestamps?: Date;
    user?: User;
    user_id: number;
    Forum?: Forum;
}
