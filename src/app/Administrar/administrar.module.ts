import { NgModuleResolver } from "@angular/compiler";

import { NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PoliticaComponent } from "./politica/politica.component";
import { AdministrarRoutes } from "./administrar.routing";
import { ComponenteComponent } from "./componente/componente.component";
import { CategoriaComponent } from "./categoria/categoria.component";
import { ActividadComponent } from "./actividad/actividad.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdministrarRoutes)
    ],
    declarations: 
    [ 
        PoliticaComponent,
        ComponenteComponent,
        CategoriaComponent,
        ActividadComponent 
    ]
   
})

export class AdministrarModule {}