export type LugarPrestamo = 'salon' | 'domicilio';

export const LUGARES_PRESTAMO: {value: LugarPrestamo, label: string}[] = [
    { value: 'salon', label: "Salón" },
    { value: 'domicilio', label: "Domicilio" },
];
