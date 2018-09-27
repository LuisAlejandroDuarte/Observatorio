import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdministrarModule } from './Administrar/administrar.module';
import { AdminLayoutComponent } from './layout/layout.component';



export const AppRoutes: Routes = [
    
     {
      path: '',
      component: AdminLayoutComponent,
      children: [
      {
          path: 'administrar',
          loadChildren: './administrar/administrar.module#AdministrarModule'
      },
      {
        path: 'relacionar',
        loadChildren: './relacionar/relacionar.module#RelacionarModule'
       }
    ]}
  //   ,{
  //       path: 'Instrumentos',
  //       loadChildren: './Instrumentos/instrumento.module#InstrumentosModule'
  //   } ,{
  //     path: 'Equipos',
  //     loadChildren: './Equipos/equipo.module#EquiposModule'
  // }
    // , {
    //     path: 'forms',
    //     loadChildren: './forms/forms.module#Forms'
    // }, {
    //     path: 'tables',
    //     loadChildren: './tables/tables.module#TablesModule'
    // }, {
    //     path: 'maps',
    //     loadChildren: './maps/maps.module#MapsModule'
    // }, {
    //     path: 'widgets',
    //     loadChildren: './widgets/widgets.module#WidgetsModule'
    // }, {
    //     path: 'charts',
    //     loadChildren: './charts/charts.module#ChartsModule'
    // }, {
    //     path: 'calendar',
    //     loadChildren: './calendar/calendar.module#CalendarModule'
    // }, {
    //     path: '',
    //     loadChildren: './userpage/user.module#UserModule'
    // }, {
    //     path: '',
    //     loadChildren: './timeline/timeline.module#TimelineModule'
    // }
 //]}
];

