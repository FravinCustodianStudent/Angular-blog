import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FbCreateResponse, Post} from "../admin/shared/interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) {

  }
  create(post:Post):Observable<Post>{


    return this.http.post<Post>(`${environment.fbDbUrl}/posts.json`,post)
      // @ts-ignore
      .pipe(map((res:FbCreateResponse) => {
        const newPost: Post = {
          ...post,
          id:res.name,
          date:new Date(post.date)
        }
        return newPost
      }))
  }
  getAll(){
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(map((response:{[key:string]:any})=>{
        return Object.keys(response)
          .map(key=>({
            ...response[key],
            id:key,
            date:new Date(response[key].date)
          }))
      }))
  }
  getById(id:string):Observable<Post>{
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(map((post:Post) => {
        return  {
          ...post,
          id,
          date:new Date(post.date)
        }
      }))
  }
  remove(id:string):Observable<void>{
  return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }
  update(post:Post):Observable<Post>{
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`,post)
  }
}