import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoliticaComponent } from './Politica/politica.component';


@NgModule({
  declarations: [

    PoliticaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
       
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule
    
  ],
  providers: [PoliticaComponent]
})
export class AdministrarModule { }