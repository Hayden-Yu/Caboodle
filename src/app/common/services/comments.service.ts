import { Comments } from '../models/comments';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

export class CommentsService {

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

    getCommentsArticle(id: number): Observable<Comments> {
        return this.http.get(`${environment.api}comments/${id}`)
          .pipe((res: any) => res);
    }

    replyToThread(comment: Comments): Observable<Comments> {
        return this.http.post(`${environment.api}comments`, comment).pipe(map((res: any) => res));
    }
}
