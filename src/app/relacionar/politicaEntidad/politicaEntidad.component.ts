import { Component } from "@angular/core";

@Component({
    selector: 'app-politicaentidad',
    templateUrl: './politicaEntidad.component.html'    
  })
  export class PoliticaEntidadComponent {
    cars = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab', disabled: true },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
  ]
    constructor() {

    }

    ngOnInit(): void {  
          


    }

  }