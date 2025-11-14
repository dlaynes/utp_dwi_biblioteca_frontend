export type GeneroLiterario = 'narrativo' | 'poesia' | 'dramatico' | 'didactico' | 'lirico';

export const GENEROS_LITERARIOS: {value: GeneroLiterario, label: string}[] = [
    { value: 'narrativo', label: "Narrativo" },
    { value: 'poesia', label: "Poesía" },
    { value: 'dramatico', label: "Dramático" },
    { value: 'didactico', label: "Didáctico" },
    { value: 'lirico', label: "Lírico" },
];
