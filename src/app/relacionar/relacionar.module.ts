import { NgModuleResolver } from "@angular/compiler";

import { NgModule } from "@angular/core";
import { NgSelectModule } from '@ng-select/ng-select';

import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatInputModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { RelacionarRoutes } from "./relacionar.routing";
import { PoliticaEntidadComponent } from "./politicaEntidad/politicaEntidad.component";
import { PoliticaService } from "../servicio/politica.service";
import { EntidadService } from "../servicio/entidad.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EntidadPoliticaService } from "../servicio/entidadPolitica.service";
import { ComponenteService } from "../servicio/componente.service";
import { EntidadPoliticaComponenteService } from "../servicio/entidadPoliticaComponente.service";
@NgModule({
    imports: [
        CommonModule,    
        NgSelectModule,     
        RouterModule.forChild(RelacionarRoutes),
        FormsModule,
        NgbModule
    ],
    declarations: 
    [ 
        PoliticaEntidadComponent
    ],
   providers:[PoliticaService,EntidadService,EntidadPoliticaService,
    ComponenteService,EntidadPoliticaComponenteService]
})

export class RelacionarModule {}