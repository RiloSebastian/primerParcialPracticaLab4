import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pelicula } from '../../clases/pelicula';
import { PeliculasService } from '../../servicios/peliculas.service';

@Component({
	selector: 'app-busqueda',
	templateUrl: './busqueda.component.html',
	styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit, OnDestroy {
	public detallePeli: boolean = false;
	public peliculaSeleccionada: Pelicula = null;
	public peliculas: Array<Pelicula> = null;
	public subPel = null;
	constructor(private peliculasServ: PeliculasService) { }

	ngOnInit(): void {
		this.subPel = this.peliculasServ.traerTodosTiempoReal().subscribe(snap => {
			this.peliculas = snap.map(peli => {
				const x = peli.payload.doc.data();
				x['id'] = peli.payload.doc.id;
				return { ...x as Pelicula };
			});
		});
	}

	mostrarDetalle(peli: Pelicula | null) {
		if (peli !== null) {
			this.peliculaSeleccionada = peli;
			this.detallePeli = true;
		} else {
			this.detallePeli = false;
		}
	}

	borrarPeli() {
		this.peliculasServ.borrarPelicula(this.peliculaSeleccionada.id);
	}

	ngOnDestroy(): void {
		if (this.subPel !== null) {
			this.subPel.unsubscribe();
		}
	}

}
