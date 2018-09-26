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
import { MatInputModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { CrudPoliticaComponent } from "../crud/crud.politica.component";
import { PoliticaService } from "../servicio/politica.service";
@NgModule({
    imports: [
        CommonModule,         
        RouterModule.forChild(AdministrarRoutes),
        FormsModule
    ],
    declarations: 
    [ 
        PoliticaComponent,
        ComponenteComponent,
        CategoriaComponent,
        ActividadComponent,
        CrudPoliticaComponent 
    ],
   providers:[PoliticaService]
})

export class AdministrarModule {}