export type RolKey = 'ROLE_ADMIN' | 'ROLE_BIBLIOTECARIO' | 'ROLE_CLIENTE'

export const ROLES : {label: string, value: RolKey}[] = [
    {value: 'ROLE_ADMIN', label: 'Admin'},
    {value: 'ROLE_BIBLIOTECARIO', label: 'Bibliotecario'},
    {value: 'ROLE_CLIENTE', label: 'Cliente'},
];

export interface Rol {
    id: number;
    nombre: string; // Es la parte que varía en el RolKey
};
