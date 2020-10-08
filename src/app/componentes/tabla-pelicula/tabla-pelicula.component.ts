import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PeliculasService } from '../../servicios/peliculas.service';
import { Pelicula } from '../../clases/pelicula'

@Component({
	selector: 'tabla-pelicula',
	templateUrl: './tabla-pelicula.component.html',
	styleUrls: ['./tabla-pelicula.component.css']
})
export class TablaPeliculaComponent implements OnInit, OnDestroy {
	@Input() peliSelBusqueda: Pelicula;
	@Output() peliSelect: EventEmitter<Pelicula | null> = new EventEmitter<Pelicula | null>();
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

	public seleccionarPelicula(pelicula: Pelicula) {
		this.peliSelect.emit(pelicula);
	}

	ngOnDestroy(): void {
		if (this.subPel !== null) {
			this.subPel.unsubscribe();
		}
	}

}
