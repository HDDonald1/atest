import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { PostData } from 'src/app/models/share.model';
import { User } from 'src/app/models/user.model';

@Injectable()

export class CoreService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').pipe(
      catchError(() => of([]))
    )
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
  }

  savePost(id: number, changes: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`, changes)
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
  }

  getPostData(postId: number): Observable<PostData> {
    return this.getPost(postId).pipe(
      mergeMap(post => this.getUser(post.userId).pipe(
        map(user => ({user, post}))
      )
      ),
    )
  }
}
