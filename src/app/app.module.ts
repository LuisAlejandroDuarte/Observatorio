import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { RouterModule } from '@angular/router';
import {  AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layout/layout.component';
import { MainModule } from './main/main.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LayoutLoginComponent } from './layout/layoutlogin.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LayoutLoginComponent
  ],
  imports: [
    HttpModule,  
    HttpClientModule,  
    BrowserModule,   
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),     
    MainModule    
  ],

  providers: [AuthGuard],
  bootstrap: [AppComponent]  
})
export class AppModule { }
