export type TipoDocumento = 'dni' | 'carnetExtranjeria' | 'pasaporte';

export const TIPOS_DOCUMENTO: {value: TipoDocumento, label: string}[] = [
    { value: 'dni', label: "DNI" },
    { value: 'carnetExtranjeria', label: "Carnet extranjería" },
    { value: 'pasaporte', label: "Pasaporte" },
];
