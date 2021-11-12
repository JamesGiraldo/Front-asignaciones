import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay, map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Post } from '../models/post.model';
import { PostInterface } from '../interfaces/post.interface';

const base_url = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPosts() {
    return this.http.get(`${base_url}/posts`, this.authService.headers);
  }

  ShowPost(id: string) {
    const url = `${base_url}/posts/${id}`
    return this.http.get( url, this.authService.headers).pipe(
      map((resp: { ok: boolean, post: Post }) => resp.post)
    )
  }

  NewPost(data: PostInterface) {
    const url = `${base_url}/posts`;
    return this.http.post(url, data, this.authService.headers);
  }

  PutPost(id: number, data: PostInterface) {
    const url = `${base_url}/posts/${id}`;
    return this.http.put(url, data, this.authService.headers);
  }

  DeletePost(id: number) {
    const url = `${base_url}/posts/${id}`;
    return this.http.delete(url, this.authService.headers);
  }


}
