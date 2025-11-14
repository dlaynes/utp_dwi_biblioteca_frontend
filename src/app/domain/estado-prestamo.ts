export type EstadoPrestamo = 'reservado' | 'cancelado' | 'prestado' | 'entregado' | 'perdido';

export const ESTADOS_PRESTAMO: {value: EstadoPrestamo, label: string}[] = [
    { value: 'reservado', label: "Reservado" },
    { value: 'cancelado', label: "Cancelado" },
    { value: 'prestado', label: "Prestado" },
    { value: 'entregado', label: "Entregado" },
    { value: 'perdido', label: "Perdido" },
];
