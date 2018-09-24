import { Component } from "@angular/core";
declare const $: any;
@Component({
    selector: 'app-politica',
    templateUrl: './politica.component.html',
    styles :['./politica.component.css']    
  })
  export class PoliticaComponent {

    constructor() {
      
    }

    ngOnInit(): void {  
    
      
      var tabla= $('#dataInstrumentos').DataTable( {   
           dom: '<"toolbar">frtip',              
           columns: [                  
               { title: "Nombre",data:"nombre" },
               { title: "Descripción",data:"descripcion" }               
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
       $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');
      
      }
    
   
  }