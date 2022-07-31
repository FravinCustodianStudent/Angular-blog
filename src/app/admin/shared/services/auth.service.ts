import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

  get token():string{
    return ''
  }
  constructor(private http:HttpClient) { }
  login(user:User):Observable<any>{
  return   this.http.post('',user)
  }
  logout(){

  }
  isAuthenticate():boolean{
    return !!this.token;
  }
  private setToken(){

  }
}
