import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { RouterModule } from '@angular/router';
import {  AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layout/layout.component';
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    FormsModule,
    HttpModule,    
    RouterModule.forRoot(AppRoutes),       
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MainModule    
  ],

  providers: [AuthGuard],
  bootstrap: [AppComponent]  
})
export class AppModule { }
