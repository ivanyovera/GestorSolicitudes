import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription, throwError } from 'rxjs';
import { delay, map, tap, catchError } from 'rxjs/operators';
import { Solicitud } from '../models/solicitud';
import { EstadoSolicitud } from '../models/estado';
import { SOLICITUDES_MOCK } from '../mocks/solicitudes-mock';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService implements OnDestroy{
  private _solicitudes$ = new BehaviorSubject<Solicitud[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _error$ = new BehaviorSubject<string | null>(null);

  public solicitudes$ = this._solicitudes$.asObservable();
  public loading$ = this._loading$.asObservable();
  public error$ = this._error$.asObservable();

  private subscriptions = new Subscription();

  constructor() {
    this.fetchSolicitudes();
  }

  fetchSolicitudes(): void {
    this._loading$.next(true);
    this._error$.next(null);

    const sub = of(SOLICITUDES_MOCK).pipe(
      delay(1000),
      tap(solicitudes => {
        this._solicitudes$.next(solicitudes);
        this._loading$.next(false);
      }),
      catchError(err => {
        this._error$.next('No se pudieron cargar las solicitudes.');
        this._loading$.next(false);
        return throwError(err);
      })
    ).subscribe();
    this.subscriptions.add(sub);
  }

  actualizarEstado(id: number, nuevoEstado: EstadoSolicitud): Observable<void> {
    this._loading$.next(true);
    this._error$.next(null);
    
    return of(null).pipe(
      delay(800),
      tap(() => {
        const listaActual = this._solicitudes$.value;
        const listaActualizada = listaActual.map(solicitud => 
          solicitud.id === id ? { ...solicitud, estado: nuevoEstado } : solicitud
        );
        this._solicitudes$.next(listaActualizada);
        this._loading$.next(false);
      }),
      catchError(err => {
        this._error$.next('Error al actualizar el estado.');
        this._loading$.next(false);
        return throwError(err);
      }),
      map(() => void 0)
    );
  }

  filtrarSolicitudes(estado: EstadoSolicitud | 'Todos'): void {
    this._error$.next(null);
    if (estado === 'Todos') {
      this._solicitudes$.next(SOLICITUDES_MOCK);
    } else {
      const filtrados = SOLICITUDES_MOCK.filter(s => s.estado === estado);
      this._solicitudes$.next(filtrados);
    }
  }

  limpiarError(): void {
    this._error$.next(null);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
