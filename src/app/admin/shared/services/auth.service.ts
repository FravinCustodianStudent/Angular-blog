import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, Subject, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {FbAuthResponse, User} from "../../../shared/interfaces";

@Injectable({providedIn:'root'})
export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  get token():string | null{
      const exp = new Date(localStorage.getItem('fb-token-exp')!);
      if (new Date()>exp){
        this.logout()
        return null
      }
    return localStorage.getItem('fb-token')
  }
  constructor(private http:HttpClient) { }
  login(user:User):Observable<any>{
    user.returnSecureToken= true;

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,user)
    .pipe(
      // @ts-ignore
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    )
  }
  logout(){
    this.setToken(null)
  }
  private handleError(error:HttpErrorResponse) : any{
    const {message} = error.error.error

      switch (message){
        case 'EMAIL_NOT_FOUND':
          this.error$.next('Email not found')
          break;
        case 'INVALID_EMAIL':
          this.error$.next('Invalid email')
          break;
        case 'INVALID_PASSWORD':
          this.error$.next('Invalid Password')
          break;
      }

  }
  isAuthenticate():boolean{
    return !!this.token;
  }
  private setToken(response:FbAuthResponse | null){
    if (response){
      const expDate = new Date(new Date().getTime() + +response.expiresIn*1000)
      localStorage.setItem('fb-token',response.idToken)
      localStorage.setItem('fb-token-exp',expDate.toString())
    }else {
      localStorage.clear()
    }

  }
}
