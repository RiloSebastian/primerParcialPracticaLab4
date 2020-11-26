import { Component, OnInit, OnDestroy } from '@angular/core';
import { Actor } from '../../clases/actor';
import { ActoresService } from '../../servicios/actores.service';
import { PeliculasService } from '../../servicios/peliculas.service';
import { PaisesService } from '../../servicios/paises.service';

@Component({
	selector: 'app-pais-pelicula',
	templateUrl: './pais-pelicula.component.html',
	styleUrls: ['./pais-pelicula.component.css']
})
export class PaisPeliculaComponent implements OnInit, OnDestroy {
	public detallePaisBool: boolean = false;
	public actores: Array<Actor> = [];
	public listaPeliculas: Array<any> = [];
	public listaPaises: Array<any> = [];
	public detallePais: any = null;
	public subAct = null;

	constructor(private actoresServ: ActoresService, private peliculasServ: PeliculasService, private paisesServ: PaisesService) { }

	ngOnInit(): void {
		this.subAct = this.paisesServ.traerTodosTiempoReal().subscribe(snap => {
			this.listaPaises = snap as Array<any>;
			console.log(this.listaPaises);
		});
	}

	public mostrarDetalle(pais: any | null) {
		console.log(pais);
		if (pais !== null) {
			this.peliculasServ.traerPorPais(pais).then(snap => {
				this.listaPeliculas = snap.map(docs => {
					const x = docs.data();
					x['id'] = docs.id;
					return { ...x as Object };
				});
			}).then(() => {
				return this.actoresServ.traerPorPais(pais).then(snap => {
					this.actores = snap.map(docs => {
						const x = docs.data();
						x['id'] = docs.id;
						return { ...x as Actor };
					});
				});
			}).then(() => {
				this.detallePais = this.listaPaises.find(x=> x.name === pais);
				console.log(this.detallePais);
			}).then(() => {
				this.detallePaisBool = true;
			});
		} else {
			this.detallePaisBool = false;
		}
	}

	ngOnDestroy(): void {
		if (this.subAct !== null) {
			this.subAct.unsubscribe();
		}
	}

}
