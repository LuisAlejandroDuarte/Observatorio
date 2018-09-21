import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministrarModule } from '../Administrar/administrar.module';
import { RouterModule } from '@angular/router';
import { MainRoutes } from './main.routing';
import { MainComponent } from './main.component';
import { LoginComponent } from '../login/login.component';


@NgModule({
  declarations: [ 
      MainComponent,
      LoginComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AdministrarModule,  
    RouterModule.forRoot(MainRoutes),        
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule
    
  ],
  providers: []
})
export class MainModule { }