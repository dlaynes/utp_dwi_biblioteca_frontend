import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthState } from '../../state/auth-state';
import { Router } from '@angular/router';

// Revisa que el token no haya expirado
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  
  constructor(
    private authState: AuthState,
    private router: Router
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error=>{
      console.log("Se produjo un error:", error);
      if(error.status == 401){
        this.authState.logout();
        this.router.navigateByUrl('/');
      }
      const errMsg = error.error?.message || error.statusText;
      return throwError(() => errMsg);
    }))
  }
  
}
