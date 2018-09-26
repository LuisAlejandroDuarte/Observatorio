import { Component } from "@angular/core";
import { PoliticaService } from "../servicio/politica.service";
import { Politica } from "../modelo/politica.modelo";
declare const $: any;

@Component({
    selector: 'app-crudpolitica',
    templateUrl: './crud.politica.component.html'
    
})
export class CrudPoliticaComponent {
    title:string;
    showData:boolean;
    nombre:string;
    descripcion:string;
    constructor (private servicePolitica:PoliticaService) {

    }


    onClicNueva() {
        this.title="Crear Nueva Política";
        this.showData =false;

    }

    onClicVolver() {
        this.showData =true;

       
     
        setTimeout(() => {           
            this.iniciarTablaPolitica();
            this.title="Descripción y creación de Políticas";
        });
      
    }
    onClicGuardar()
    {
        if (this.nombre=="" || this.nombre==undefined)
        {
            alert("Falta Nombre");
            return;
        }

        let politica:Politica;
            politica = new Politica();
            politica.pgd_nomb = this.nombre;
            politica.pgd_desc=this.descripcion;

        this.servicePolitica.insert(politica).subscribe(res=>{
            
        });

        
    }

iniciarTablaPolitica() {
    var tabla= $('#dataPolitica').DataTable( {  
        dom: '<"top"f>rt<"bottom"p><"clear">',          
        columns: [                  
            { title: "Nombre",data:"pgd_nomb" },
            { title: "Descripción",data:"pgd_desc" }               
        ],
        responsive: true,
        scrollY:        200,                             
        language: {
            
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }                    
         }
    });
    
}

ngAfterViewInit()
    {
     
      this.showData=true;
      this.iniciarTablaPolitica();
     // this.showTabla=true;
    }

  public  ngOnInit() {  
        this.showData =true;
        this.title="Descripción y creación de Políticas";
        $('#dataPolitica').empty();
        $('#dataPolitica').DataTable().destroy();
        this.iniciarTablaPolitica();
        this.servicePolitica.select().subscribe(res=>{
            var table = $('#dataPolitica').DataTable();                   
            table.clear();
            table.rows.add(res);
            table.draw();     
        });        
       
        }

  }