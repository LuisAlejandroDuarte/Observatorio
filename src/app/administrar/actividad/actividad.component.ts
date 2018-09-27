import { Component } from "@angular/core";
import { ActividadService } from "../../servicio/actividad.service";
import { Actividad } from "../../modelo/actividad.modelo";
declare const $: any;
@Component({
    selector: 'app-actividad',
    templateUrl: './actividad.component.html'    
  })
  export class ActividadComponent {

    constructor(private serviceActividad:ActividadService) {

    }

    title:string;
    showData:boolean;
    nombre:string;    
    acg_codi:number;



    onClicNueva() {
        this.title="Crear Actividad";
        this.showData =false;
        this.nombre="";
      
    }

    onClicVolver() {
        this.showData =true;

       
     
        setTimeout(() => {          
            $('#iconoEspera').show();      
            this.iniciarTablaActividad();
            this.title="Creación de Actividad";
            this.serviceActividad.select().subscribe(res=>{
                var table = $('#dataActividad').DataTable();                   
                table.clear();
                table.rows.add(res);
                table.draw();     
                $('#iconoEspera').hide();     
            });
        });
      
    }
    onClicGuardar()
    {
        if (this.nombre=="" || this.nombre==undefined)
        {
            alert("Falta Nombre");
            return;
        }
        $('#iconoEspera').show();     
        let actividad:Actividad;
        actividad = new Actividad();
        actividad.acg_desc = this.nombre;                
        if ( this.acg_codi==0)
        {      
            this.serviceActividad.insert(actividad).subscribe(res=>{
                this.onClicVolver();
                $('#iconoEspera').hide();     
            });
        }       
        else
        {
          actividad.acg_codi=this.acg_codi;
            this.serviceActividad.update(actividad).subscribe(res=>{
                this.onClicVolver();
                $('#iconoEspera').hide();     
            });
        } 
    }

    iniciarTablaActividad() {
    var tabla= $('#dataActividad').DataTable( {  
        dom: '<"top"f>rt<"bottom"p><"clear">',          
        columns: [                  
            { title: "Nombre",data:"acg_desc" }            
        ],
        columnDefs:[{
            
            targets: [1],
            data: null,
            width:'0.5%',
            orderable: false,             
                render:  ( data, type, full, meta )=>{       
                return  '<button id="' + full.acg_codi + '" class="btn btn-block btn-default btn-sm" title="Editar" data-element-id=' + full.acg_codi + ' data-element-nombre="' + full.acg_desc + '"><i class="fa fa-pencil-square-o" aria-hidden="true" ></i></button>'          
        
                }
                                      
        }],
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
    $('#dataActividad tbody').on('click', 'tr',  (event) => {
        this.acg_codi= parseInt(event.currentTarget.cells[1].children[0].dataset.elementId);
        let actividad : Actividad;
            actividad = new Actividad();
            actividad.acg_codi=this.acg_codi;
            $('#iconoEspera').show();     
        this.serviceActividad.selectbyId(actividad).subscribe(res=>{
           this.nombre = res[0].acg_desc;
           $('#iconoEspera').hide();     
           this.title="Editar Actividad";
           this.showData =false;
        });

    });
    
}

ngAfterViewInit()
    {
     
      this.showData=true;
      this.iniciarTablaActividad();
     // this.showTabla=true;
    }

  public  ngOnInit() {  
        this.acg_codi=0;
        this.showData =true;
        this.title="Creación de Actividades";
        $('#dataActividad').empty();
        $('#dataActividad').DataTable().destroy();
        this.iniciarTablaActividad();
        $('#iconoEspera').show();     
        this.serviceActividad.select().subscribe(res=>{
            var table = $('#dataActividad').DataTable();                   
            table.clear();
            table.rows.add(res);
            table.draw();     
            $('#iconoEspera').hide();     
        });        
       
        }       


  }