import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActoresService } from '../../servicios/actores.service';
import { Actor } from '../../clases/actor';

@Component({
	selector: 'eliminar-actor',
	templateUrl: './eliminar-actor.component.html',
	styleUrls: ['./eliminar-actor.component.css']
})
export class EliminarActorComponent implements OnInit {
	@Input() actorSelecccionado: Actor;
	@Output() eliminado: EventEmitter<boolean> = new EventEmitter<boolean>();
	constructor(private actoresServ: ActoresService) { }

	ngOnInit(): void {
	}

	borrarPeli() {
		this.actoresServ.borrarActor(this.actorSelecccionado.id);
		this.eliminado.emit(false);
	}

}
