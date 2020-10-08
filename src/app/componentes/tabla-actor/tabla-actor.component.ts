import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Actor } from '../../clases/actor'

@Component({
	selector: 'tabla-actor',
	templateUrl: './tabla-actor.component.html',
	styleUrls: ['./tabla-actor.component.css']
})
export class TablaActorComponent implements OnInit {
	@Input() actores: Array<Actor>
	@Output() actoresSel: EventEmitter<Array<Actor>> = new EventEmitter<Array<Actor>>();
	public arrAux: Array<Actor> = [];
	constructor() { }

	ngOnInit(): void {}

	public seleccionarActor(actor: Actor) {
		this.arrAux.push(actor);
		this.actoresSel.emit(this.arrAux);
	}

	public deseleccionarActor(actor: Actor){
		let indice = this.arrAux.findIndex(x => x.id === actor.id);
		this.arrAux.splice(indice,1);
		this.actoresSel.emit(this.arrAux);
	}

	public estaSeleccionado(actor:Actor){
		if(this.arrAux.findIndex(x => x.id === actor.id) !== -1){
			return true;
		} else{
			return false;
		}
	}


}
