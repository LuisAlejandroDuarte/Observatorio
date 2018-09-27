import { Routes } from "@angular/router";
import { PoliticaEntidadComponent } from "./politicaEntidad/politicaEntidad.component";

export const RelacionarRoutes: Routes = [       
    {
        path: '',
        children: [{
            path: 'politicaEntidad',
            component: PoliticaEntidadComponent         
        }]
    }
];