import { Routes } from "@angular/router";
import { PoliticaComponent } from "./politica/politica.component";
import {ComponenteComponent} from "./componente/componente.component";
import { CategoriaComponent } from "./categoria/categoria.component";
import { ActividadComponent } from "./actividad/actividad.component";
import { EntidadComponent } from "./entidad/entidad.component";
import { AuthGuard } from "../guards/auth.guard";
export const AdministrarRoutes: Routes = [       
    {
        path: '',
        children: [{
            path: 'politica',
            component: PoliticaComponent,
            canActivate:[AuthGuard]         
        }]
    },{
        path: '',
        children: [{
            path: 'componente',
            component: ComponenteComponent,
            canActivate:[AuthGuard]            
        }]
        
    },{
        path: '',
        children: [{
            path: 'categoria',
            component: CategoriaComponent,
            canActivate:[AuthGuard]            
        }]
        
    },{
        path: '',
        children: [{
            path: 'actividad',
            component: ActividadComponent,
            canActivate:[AuthGuard]            
        }]
        
    },{
        path: '',
        children: [{
            path: 'entidad',
            component: EntidadComponent,
            canActivate:[AuthGuard]             
        }]
        
    }
];