import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { PeliculaAltaComponent } from './pages/pelicula-alta/pelicula-alta.component';
import { ActorListadoComponent } from './pages/actor-listado/actor-listado.component';
import { ActorAltaComponent } from './pages/actor-alta/actor-alta.component';
import { PeliculaListadoComponent } from './pages/pelicula-listado/pelicula-listado.component';



const routes: Routes = [
	{ path:'', redirectTo:'Bienvenido', pathMatch:'full' },
	{ path:'Bienvenido', component:BienvenidoComponent },
	{ path:'Busqueda', component:BusquedaComponent },
	{ path:'Peliculas/Alta', component:PeliculaAltaComponent },
	{ path:'Peliculas/Listado', component:PeliculaListadoComponent },
	{ path:'Actor/Alta', component:ActorAltaComponent },
	{ path:'Actor/Listado', component:ActorListadoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
