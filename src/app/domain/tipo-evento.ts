export type TipoEvento = 'seminario' | 'taller' | 'conferencia';

export const TIPOS_EVENTO: {value: TipoEvento, label: string}[] = [
    { value: 'taller', label: "Taller" },
    { value: 'seminario', label: "Seminario" },
    { value: 'conferencia', label: "Conferencia" },
];
