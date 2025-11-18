import type { EstadoCivil } from "./estado-civil";
import type { EstadoUsuario } from "./estado-usuario";
import type { Genero } from "./genero";
import type { RolKey, Rol } from "./rol";
import type { TipoDocumento } from "./tipo-documento";

export interface Usuario {
    id: number;
    nombres: string;
    apellidos: string;
    email: string;
    fechaRegistro: string;
    ultimoLogin: string;
    estadoUsuario: EstadoUsuario;
    emailPersonal: string;
    numeroDocumento: string;
    telefono: string;
    tipoDocumento: TipoDocumento;
    estadoCivil: EstadoCivil;
    genero: Genero;
    roles: Rol[];
    rolKeys: RolKey[];
};
