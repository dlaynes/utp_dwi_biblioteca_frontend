export type EstadoUsuario = 'normal' | 'suspendido';

export const ESTADOS_USUARIO: {value: EstadoUsuario, label: string}[] = [
    { value: 'normal', label: "Normal" },
    { value: 'suspendido', label: "Suspendido" },
];
