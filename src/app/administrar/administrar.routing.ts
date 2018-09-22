import { Routes } from "@angular/router";
import { PoliticaComponent } from "./politica/politica.component";
import {ComponenteComponent} from "./componente/componente.component";
import { CategoriaComponent } from "./categoria/categoria.component";
import { ActividadComponent } from "./actividad/actividad.component";
export const AdministrarRoutes: Routes = [       
    {
        path: '',
        children: [{
            path: 'politica',
            component: PoliticaComponent         
        }]
    },{
        path: '',
        children: [{
            path: 'componente',
            component: ComponenteComponent         
        }]
        
    },{
        path: '',
        children: [{
            path: 'categoria',
            component: CategoriaComponent         
        }]
        
    },{
        path: '',
        children: [{
            path: 'actividad',
            component: ActividadComponent         
        }]
        
    }
];