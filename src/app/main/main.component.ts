import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-main',
    templateUrl: 'main.component.html',
})


export class MainComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit(): void {       
    }


    onClicPolitica() {
        this.router.navigate(['/administrar/politica']);
    }

    onClicComponente() {
        this.router.navigate(['/administrar/componente']);
    }

    onClicCategoria() {
        this.router.navigate(['/administrar/categoria']);
    }

    onClicActividad() {
        this.router.navigate(['/administrar/actividad']);
    }

}