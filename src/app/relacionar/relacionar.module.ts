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
import { CategoriaService } from "../servicio/categoria.service";
import { EPoliticaComponenteCategoriaService } from "../servicio/ePoliticaComponenteCategoria";
import { ActividadService } from "../servicio/actividad.service";
import { CategoriaActividadService } from "../servicio/categoriaActividad.service";
import { EvaluarComponent } from "./evaluar/evaluar.component";
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { jqxPanelComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxpanel';
import { ArbolService } from "../servicio/arbol.service";
import { EvaluarService } from "../servicio/evaluar.service";
import { jqxGridComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid";
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
        PoliticaEntidadComponent,
        EvaluarComponent,
        jqxTreeComponent,
        jqxPanelComponent,
        jqxGridComponent
    ],
   providers:[PoliticaService,EntidadService,EntidadPoliticaService,CategoriaService,
    ComponenteService,EntidadPoliticaComponenteService,EPoliticaComponenteCategoriaService,
    ActividadService,CategoriaActividadService,ArbolService,EvaluarService]
})

export class RelacionarModule {}