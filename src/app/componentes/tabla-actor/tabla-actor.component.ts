import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Actor } from '../../clases/actor'

@Component({
	selector: 'tabla-actor',
	templateUrl: './tabla-actor.component.html',
	styleUrls: ['./tabla-actor.component.css']
})
export class TablaActorComponent implements OnInit {
	@Input() actores: Array<Actor>
	@Output() actoresSel: EventEmitter<Actor> = new EventEmitter<Actor>();
	constructor() { }

	ngOnInit(): void { }

	public seleccionarActor(actor: Actor) {
		this.actoresSel.emit(actor);
	}
}
