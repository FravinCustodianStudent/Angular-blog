import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../admin/shared/services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private auth:AuthService,private router:Router) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticate()){
      req = req.clone({
        setParams:{
          auth:this.auth.token as string
        }
      })
    }
    return next.handle(req)
      .pipe(
        catchError((err:HttpErrorResponse)=>{
          console.log(req)
          console.log(err)
          if (err.status ===401){
            this.auth.logout()
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                authFailed: true
              }
            })
          }
          return throwError(() => new Error())
        })
      )
  }

}
