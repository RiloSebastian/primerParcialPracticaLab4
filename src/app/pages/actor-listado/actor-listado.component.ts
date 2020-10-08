import { Component, OnInit, OnDestroy } from '@angular/core';
import { Actor } from '../../clases/actor';
import { ActoresService } from '../../servicios/actores.service';
@Component({
	selector: 'app-actor-listado',
	templateUrl: './actor-listado.component.html',
	styleUrls: ['./actor-listado.component.css']
})
export class ActorListadoComponent implements OnInit, OnDestroy {

	public detallePeli: boolean = false;
	public actorSelecccionado: Actor = null;
	public actores: Array<Actor> = [];
	public subAct = null
	constructor(private actoresServ: ActoresService) { }

	ngOnInit(): void {
		this.subAct = this.actoresServ.traerTodosTiempoReal().subscribe(snap => {
			this.actores = snap.map(actor => {
				const x = actor.payload.doc.data();
				x['id'] = actor.payload.doc.id;
				return { ...x as Actor };
			});
		});
	}

	mostrarDetalle(actor: Actor | null) {
		if (actor !== null) {
			this.actorSelecccionado = actor;
			this.detallePeli = true;
		} else {
			this.detallePeli = false;
		}
	}

	borrarPeli() {
		this.actoresServ.borrarActor(this.actorSelecccionado.id);
		this.detallePeli = false;
	}

	ngOnDestroy(): void {
		if (this.subAct !== null) {
			this.subAct.unsubscribe();
		}
	}
}
