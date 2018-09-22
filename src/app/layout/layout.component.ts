import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html'
  })
  
  export class AdminLayoutComponent  {
    constructor(private router: Router) {

    }

    ngOnInit(): void {       
    }


  }