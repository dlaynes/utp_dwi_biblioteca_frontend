import { TipoEvento } from "./tipo-evento";

export interface Evento {
    id: number;
    fechaRegistro: string;
    titulo: string;
    tipoEvento: TipoEvento
}
