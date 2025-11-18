import type { Autor } from "./autor";
import type { Categoria } from "./categoria";
import type { Editorial } from "./editorial";
import type { Idioma } from "./idioma";

export interface Libro {
    id: number;
    fechaRegistro: string;
    titulo: string;
    autor: Autor;
    autorId?: number;
    ibsm: string;
    editorial: Editorial;
    editorialId?: number;
    idioma: Idioma;
    idiomaId?: number;
    nacionalidad: string;
    paginas: number;
    imagen: string;
    publicadoEn: string;
    generoLiterario: string;
    disponibles: number;
    reservados: number;
    prestados: number;
    perdidos: number;
    categoriaIds?: number[];
    categorias?: Categoria[];
};
