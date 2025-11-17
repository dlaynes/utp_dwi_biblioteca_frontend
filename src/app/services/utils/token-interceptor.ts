import { Injectable } from '@angular/core';
import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import type { Observable } from 'rxjs';

// Agrega el token JWT (obtenido del AuthState) en cada petición
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ) : Observable<HttpEvent<any>> {
    const token = localStorage.getItem('biblioteca_token');
    if(token){
      let newRequest = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + token)
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
