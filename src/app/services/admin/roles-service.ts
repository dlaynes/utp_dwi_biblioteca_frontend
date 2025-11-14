import { Injectable } from '@angular/core';
import type { Rol } from '../../domain/rol';
import { Observable } from 'rxjs';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
    private base = BASE_URL + 'admin/roles';

  constructor(private http: HttpClient){
  }

  list(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.base);
  }

}
