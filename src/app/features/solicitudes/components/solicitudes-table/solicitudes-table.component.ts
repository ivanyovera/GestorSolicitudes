import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Solicitud } from '../../models/solicitud';
import { EstadoSolicitud, ESTADOS_SOLICITUD } from '../../models/estado';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-solicitudes-table',
  templateUrl: './solicitudes-table.component.html',
  styleUrls: ['./solicitudes-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class SolicitudesTableComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  dataSource = new MatTableDataSource<Solicitud>([]);
  tableColumnas: string[] = ['id', 'nombre', 'tipo', 'estado', 'fecha', 'acciones'];
  opcionesPaginator = [5, 10, 25];
  opcionPaginatorDefault = 5;
  
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  opcionesEstados = ESTADOS_SOLICITUD;
  filtroActual: EstadoSolicitud | 'Todos' = 'Todos';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private solicitudesService: SolicitudesService,
    private cdr: ChangeDetectorRef
  ) {
    this.loading$ = this.solicitudesService.loading$;
    this.error$ = this.solicitudesService.error$;
  }

  ngOnInit(): void {
    this.cargaInicial();
  }
  
  cargaInicial(): void {
    const sub = this.solicitudesService.solicitudes$.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cdr.markForCheck(); 
    });
    this.subscriptions.add(sub);
  }

  obtenerClaseEstado(estado: EstadoSolicitud): string {
    return this.opcionesEstados.find(e => e.value === estado)?.class || '';
  }

  cambiarEstado(solicitud: Solicitud, nuevoEstado: EstadoSolicitud): void {
    if (solicitud.estado !== nuevoEstado) {
      const sub = this.solicitudesService.actualizarEstado(solicitud.id, nuevoEstado).subscribe(() => {
        this.cdr.markForCheck();
      });
      this.subscriptions.add(sub);
    }
  }

  aplicarFiltro(estado: EstadoSolicitud | 'Todos'): void {
    this.solicitudesService.filtrarSolicitudes(estado);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
