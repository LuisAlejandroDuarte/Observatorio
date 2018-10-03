import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

declare const $: any;
@Component({
    selector: 'app-main',
    templateUrl: 'main.component.html',
})


export class MainComponent implements OnInit {
    width: number = 670;
    height: number = 30;
    constructor(private router: Router) {

    }

    ngOnInit(): void {   
       $('#iconoEspera').hide();     
    }


    onClicPolitica() {
        this.router.navigate(['/administrar/politica']);
    }

    onClicEntidad() {
        this.router.navigate(['/administrar/entidad']);
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

    onClicPoliticaEntidad() {
        this.router.navigate(['/relacionar/politicaEntidad']);
    }

    onClicEvaluar() {
        this.router.navigate(['/relacionar/evaluar']);
    }

    

}