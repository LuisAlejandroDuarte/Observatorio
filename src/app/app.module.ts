import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { RouterModule } from '@angular/router';
import {  AppRoutes } from './app.routing';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { PoliticaComponent } from './Administrar/Politica/politica.component';
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MainModule,
    RouterModule.forRoot(AppRoutes),       
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule
    
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]  
})
export class AppModule { }
