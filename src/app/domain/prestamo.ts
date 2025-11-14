import { InventarioLibro } from "./inventario-libro";
import { Usuario } from "./usuario";

export interface Prestamo {
    id: number;
    estadoPrestamo: string;
    lugarPrestamo: string;
    fechaRegistro: string;
    inventarioLibro: InventarioLibro;
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