import { Forum } from '../models/forum';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

export class ForumService {

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

    createArticle(forum: Forum): Observable<Forum> {
        return this.http.post(`${environment.api}forum`, forum).pipe(map((res: any) => res));
    }
    getArticleList(): Observable<Forum> {
        return this.http.get(`${environment.api}forum`).pipe(map((res: any) => res));
    }
    getArticleById(id: number): Observable<Forum> {
        return this.http.get(`${environment.api}forum/${id}`)
          .pipe((res: any) => res);
    }
}
