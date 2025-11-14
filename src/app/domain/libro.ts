import type { Autor } from "./autor";
import type { Categoria } from "./categoria";
import type { Editorial } from "./editorial";
import type { Idioma } from "./idioma";

export interface Libro {
    id: number;
    fechaRegistro: string;
    titulo: string;
    autor: Autor;
    ibsm: string;
    editorial: Editorial;
    idioma: Idioma;
    nacionalidad: string;
    paginas: number;
    imagen: string;
    publicadoEn: string;
    generoLiterario: string;
    categorias: Categoria[];
};
