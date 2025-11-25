import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type BibliotecarioDashboardResponse = {
  disponibles: number;
  reservados: number;
  prestados: number;
  perdidos: number;
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    private base = BASE_URL + 'bibliotecario/dashboard';
  
    constructor(private http: HttpClient){
    }
  
    list(): Observable<BibliotecarioDashboardResponse> {
      return this.http.get<BibliotecarioDashboardResponse>(this.base);
    }
}