import { EstadoSolicitud } from './estado';

export type TipoSolicitud = 'Examen' | 'Consulta' | 'Procedimiento';

export interface Solicitud {
  id: number;
  nombre: string;
  tipo: TipoSolicitud;
  estado: EstadoSolicitud;
  fecha: Date;
}
