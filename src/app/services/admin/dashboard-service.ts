import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type AdminDashboardResponse = {

};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    private base = BASE_URL + 'admin/dashboard';
  
    constructor(private http: HttpClient){
    }
  
    list(): Observable<AdminDashboardResponse> {
      return this.http.get<AdminDashboardResponse>(this.base);
    }
}
