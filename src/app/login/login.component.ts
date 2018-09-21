import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    
    constructor(private router: Router,) {

    }

    onClicIniciar()
    {
        sessionStorage.setItem("token","xxx");
        this.router.navigate(['/main']);
    }

}