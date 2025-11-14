export type EstadoCivil = 'casado' | 'soltero' | 'viudo' | 'divorciado';

export const ESTADOS_CIVILES: {value: EstadoCivil, label: string}[] = [
    { value: 'casado', label: "Casado/a" },
    { value: 'soltero', label: "Soltero/a" },
    { value: 'viudo', label: "Viudo/a" },
    { value: 'divorciado', label: "Divorciado/a" },
];
