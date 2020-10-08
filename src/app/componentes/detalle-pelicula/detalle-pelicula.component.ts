import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../clases/pelicula';

@Component({
	selector: 'detalle-pelicula',
	templateUrl: './detalle-pelicula.component.html',
	styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {
	@Input() peli: Pelicula;

	constructor() { }

	ngOnInit(): void {}

}
