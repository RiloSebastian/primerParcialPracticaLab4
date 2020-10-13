import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PeliculasService } from '../../servicios/peliculas.service';
import { Pelicula } from '../../clases/pelicula'

@Component({
	selector: 'tabla-pelicula',
	templateUrl: './tabla-pelicula.component.html',
	styleUrls: ['./tabla-pelicula.component.css']
})
export class TablaPeliculaComponent implements OnInit {
	@Output() peliSelect: EventEmitter<Pelicula | null> = new EventEmitter<Pelicula | null>();
	@Input() peliculas: Array<Pelicula>;
	constructor(private peliculasServ: PeliculasService) { }

	ngOnInit(): void {
	}

	public seleccionarPelicula(pelicula: Pelicula) {
		this.peliSelect.emit(pelicula);
	}

}
