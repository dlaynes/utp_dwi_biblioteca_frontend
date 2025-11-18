import { Libro } from "./libro";
import { Usuario } from "./usuario";

export interface Prestamo {
    id: number;
    estadoPrestamo: string;
    lugarPrestamo: string;
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