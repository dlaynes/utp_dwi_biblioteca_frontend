export interface Categoria {
    id: number;
    fechaRegistro: string;
    nombre: string;
    categoriaPadre?: Categoria;
    imagen: string;
}
