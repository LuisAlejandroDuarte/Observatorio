import { Routes } from "@angular/router";
import { PoliticaEntidadComponent } from "./politicaEntidad/politicaEntidad.component";
import { EvaluarComponent } from "./evaluar/evaluar.component";

export const RelacionarRoutes: Routes = [       
    {
        path: '',
        children: [{
            path: 'politicaEntidad',
            component: PoliticaEntidadComponent         
        }]
    },
    {
        path: '',
        children: [{
            path: 'evaluar',
            component: EvaluarComponent         
        }]
    }
];