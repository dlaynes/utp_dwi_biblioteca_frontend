import type { Local } from "./local";

export interface InventarioLibro {
    id: number;
    fechaRegistro: string;
    local: Local;
    disponibles: number;
    reservados: number;
    prestados: number;
    perdidos: number;
};
