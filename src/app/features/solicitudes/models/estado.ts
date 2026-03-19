export type EstadoSolicitud = 'Pendiente' | 'En proceso' | 'Completado';

export interface EstadoConfig {
  value: EstadoSolicitud;
  label: string;
  class: string;
}

export const ESTADOS_SOLICITUD: EstadoConfig[] = [
  { value: 'Pendiente', label: 'Pendiente', class: 'pendiente' },
  { value: 'En proceso', label: 'En proceso', class: 'en-proceso' },
  { value: 'Completado', label: 'Completado', class: 'completado' }
];
