import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-layoutlogin',
    templateUrl: './layoutlogin.component.html'
  })
  
  export class LayoutLoginComponent  {
    constructor(private router: Router) {

    }

    ngOnInit(): void {    
        
        this.router.navigate(['/login/login']);

    }


  }