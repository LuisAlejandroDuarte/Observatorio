import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare const $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    
    constructor(private router: Router,) {

    }

    ngOnInit(): void {   
        $('#iconoEspera').hide();     
     }

    onClicIniciar()
    {
        sessionStorage.setItem("token","xxx");
        this.router.navigate(['/administrar']);
    }

}