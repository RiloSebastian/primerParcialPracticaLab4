import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../clases/pelicula';
import { PeliculasService } from '../../servicios/peliculas.service';

@Component({
	selector: 'app-busqueda',
	templateUrl: './busqueda.component.html',
	styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
	public detallePeli: boolean = false;
	public peliculaSeleccionada: Pelicula = null;
	constructor(private peliculas: PeliculasService) { }

	ngOnInit(): void {
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
		this.peliculas.borrarPelicula(this.peliculaSeleccionada.id);
	}

}
