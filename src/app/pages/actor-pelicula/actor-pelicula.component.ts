import { Component, OnInit, OnDestroy } from '@angular/core';
import { Actor } from '../../clases/actor';
import { Pelicula } from '../../clases/pelicula';
import { ActoresService } from '../../servicios/actores.service';
import { PeliculasService } from '../../servicios/peliculas.service';
import { PaisesService } from '../../servicios/paises.service';

@Component({
	selector: 'app-actor-pelicula',
	templateUrl: './actor-pelicula.component.html',
	styleUrls: ['./actor-pelicula.component.css']
})
export class ActorPeliculaComponent implements OnInit, OnDestroy {
	public detallePeli: boolean = false;
	public actorSelecccionado: Actor = null;
	public actores: Array<Actor> = [];
	public listaPeliculas: Array<any> = [];
	public detallePais: any = null;
	public subAct = null
	constructor(private actoresServ: ActoresService, private peliculasServ: PeliculasService, private paisesServ: PaisesService) { }

	ngOnInit(): void {
		this.subAct = this.actoresServ.traerTodosTiempoReal().subscribe(snap => {
			this.actores = snap.map(actor => {
				const x = actor.payload.doc.data();
				x['id'] = actor.payload.doc.id;
				return { ...x as Actor };
			});
		});
	}

	public mostrarDetalle(actor: Actor | null) {
		if (actor !== null) {
			this.actorSelecccionado = actor;
			this.peliculasServ.traerPorActor(actor.nombre, actor.apellido).then(snap => {
				this.listaPeliculas = snap.map(docs => {
					const x = docs.data();
					x['id'] = docs.id;
					return { ...x as Object };
				});
			}).then(() => {
				return this.paisesServ.traerUno(actor.pais);
			}).then(doc => {
				this.detallePais = doc[0];
				console.log(this.detallePais);
			}).then(() => {
				this.detallePeli = true;
			});
		} else {
			this.detallePeli = false;
		}
	}

	ngOnDestroy(): void {
		if (this.subAct !== null) {
			this.subAct.unsubscribe();
		}
	}
}
