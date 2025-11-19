export interface Categoria {
    id: number;
    fechaRegistro: string;
    nombre: string;
    descripción: string;
    categoriaPadre?: Categoria;
    imagen: string;
    slug: string;
    color: string;
    icono: string;
}
