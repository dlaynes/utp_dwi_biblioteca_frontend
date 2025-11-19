import { EstadoPrestamo } from "./estado-prestamo";
import { Libro } from "./libro";
import { LugarPrestamo } from "./lugar-prestamo";
import { Usuario } from "./usuario";

export interface Prestamo {
    id: number;
    estadoPrestamo: EstadoPrestamo;
    lugarPrestamo: LugarPrestamo;
    fechaRegistro: string;
    libro: Libro;
    cliente: Partial<Usuario>;
    entregadoPor: Partial<Usuario>;
    recepcionadoPor: Partial<Usuario>;
    fechaReserva: string;
    fechaPrestamo: string;
    fechaEsperadaRetorno: string;
    fechaRetorno: string;
    observacionesEntrega: string;
    observacionesRetorno: string;
    advertencia: boolean;
}