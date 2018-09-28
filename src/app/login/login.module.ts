
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginService } from '../servicio/login.service';
import { LoginRoutes } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    FormsModule,   
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent   
  ],
  providers:[LoginService]
})

export class LoginModule {}