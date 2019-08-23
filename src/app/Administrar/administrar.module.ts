import { NgModule } from "@angular/core";


import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PoliticaComponent } from "./politica/politica.component";
import { AdministrarRoutes } from "./administrar.routing";
import { ComponenteComponent } from "./componente/componente.component";
import { CategoriaComponent } from "./categoria/categoria.component";
import { ActividadComponent } from "./actividad/actividad.component";

import { FormsModule } from "@angular/forms";
import { CrudPoliticaComponent } from "../crud/crud.politica.component";
import { PoliticaService } from "../servicio/politica.service";
import { EntidadComponent } from "./entidad/entidad.component";
import { EntidadService } from "../servicio/entidad.service";
import { ComponenteService } from "../servicio/componente.service";
import { CategoriaService } from "../servicio/categoria.service";
import { ActividadService } from "../servicio/actividad.service";
import { EPCCategoriaActividadService } from "../servicio/epcCategoriaActividad.service";

@NgModule({
    imports: [
        CommonModule,         
        RouterModule.forChild(AdministrarRoutes),
        FormsModule
        
    ],
    declarations: 
    [         
        EntidadComponent,
        ComponenteComponent,
        CategoriaComponent,
        ActividadComponent,
        CategoriaComponent,
        CrudPoliticaComponent,
        PoliticaComponent
        
    ],
   providers:[PoliticaService,EntidadService,ComponenteService,CategoriaService,ActividadService,EPCCategoriaActividadService]
})

export class AdministrarModule {}