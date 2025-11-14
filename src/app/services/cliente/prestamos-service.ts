import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Prestamo } from '../../domain/prestamo';
import { Observable } from 'rxjs';

export type ReservarPrestamoRequest = {
  lugarPrestamo: string;
  inventarioLibroId: number;
};

export type AceptarPrestamoRequest = {
  observacionesEntrega: string;
  fechaEsperadaDeRetorno: string;
};

export type RecibirPrestamoRequest = {
  observacionesRetorno: string;
  advertencia: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  private base = BASE_URL + '/cliente/prestamos';

  constructor(private http: HttpClient){
  }

  lista(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.base);
  }

  detalle(id: number): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${this.base}/${id}`);
  }

  misPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.base + '/mis-solicitudes');
  }

  misPrestamosDetalle(id: number): Observable<Prestamo> {
    return this.http.get<Prestamo>(this.base + '/mis-solicitudes/' + id);
  }

  misPrestamosCancelarReserva(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.base + '/mis-solicitudes/cancelar/' + id);
  }

  misPrestamosReservar(params: ReservarPrestamoRequest): Observable<Prestamo>{
    return this.http.post<Prestamo>(this.base + '/reservar', params);
  }

  cancelarPrestamo(id: number){
    return this.http.put<boolean>(this.base + '/cancelar/' + id, {});
  }

  aceptarPrestamo(id: number, params: AceptarPrestamoRequest): Observable<Prestamo>{
    return this.http.put<Prestamo>(this.base + '/aceptar/'+id, params);
  }

  recibirPrestamo(id: number, params: RecibirPrestamoRequest): Observable<Prestamo>{
    return this.http.put<Prestamo>(this.base + '/recibir/'+id, params); 
  }

  marcarPerdido(id: number): Observable<Prestamo>{
    return this.http.put<Prestamo>(this.base + '/marcar-como-perdido/'+id, {}); 
  }

}
