import { Injectable } from '@angular/core';
import { AuthState } from '../../state/auth-state';
import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import type { Observable } from 'rxjs';

// Agrega el token JWT (obtenido del AuthState) en cada petición
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authState: AuthState) {

  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ) : Observable<HttpEvent<any>> {
    const token = this.authState.token();
    if(token){
      let newRequest = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
