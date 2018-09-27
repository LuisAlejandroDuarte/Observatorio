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
@NgModule({
    imports: [
        CommonModule,    
        NgSelectModule,     
        RouterModule.forChild(RelacionarRoutes),
        FormsModule
    ],
    declarations: 
    [ 
        PoliticaEntidadComponent
    ],
   providers:[]
})

export class RelacionarModule {}