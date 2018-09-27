import { Component } from "@angular/core";
import { EntidadService } from "../../servicio/entidad.service";
import { Entidad } from "../../modelo/entidad.modelo";
declare const $: any;
@Component({
    selector: 'app-entidad',
    templateUrl: './entidad.component.html'
  })
  export class EntidadComponent {

    constructor(private serviceEntidad:EntidadService) {
      
    }
    title:string;
    showData:boolean;
    nombre:string;    
    ent_codi:number;



    onClicNueva() {
        this.title="Crear Entidad";
        this.showData =false;
        this.nombre="";
      
    }

    onClicVolver() {
        this.showData =true;

       
     
        setTimeout(() => {           
            this.iniciarTablaEntidad();
            this.title="Creación de Entidades";
            $('#iconoEspera').show();     
            this.serviceEntidad.select().subscribe(res=>{
                var table = $('#dataEntidad').DataTable();                   
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
        let entidad:Entidad;
        entidad = new Entidad();
        entidad.ent_nomb = this.nombre;                
        $('#iconoEspera').show();     
        if ( this.ent_codi==0)
        {      
            this.serviceEntidad.insert(entidad).subscribe(res=>{
                this.onClicVolver();
                $('#iconoEspera').hide();     
            });
        }       
        else
        {
          entidad.ent_codi=this.ent_codi;
            this.serviceEntidad.update(entidad).subscribe(res=>{
                this.onClicVolver();
                $('#iconoEspera').hide();     
            });
        } 
    }

    iniciarTablaEntidad() {
    var tabla= $('#dataEntidad').DataTable( {  
        dom: '<"top"f>rt<"bottom"p><"clear">',          
        columns: [                  
            { title: "Nombre",data:"ent_nomb" }            
        ],
        columnDefs:[{
            
            targets: [1],
            data: null,
            width:'0.5%',
            orderable: false,             
                render:  ( data, type, full, meta )=>{       
                return  '<button id="' + full.pgd_codi + '" class="btn btn-block btn-default btn-sm" title="Editar" data-element-id=' + full.ent_codi + ' data-element-nombre="' + full.ent_nomb + '"><i class="fa fa-pencil-square-o" aria-hidden="true" ></i></button>'          
        
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
    $('#dataEntidad tbody').on('click', 'tr',  (event) => {
        this.ent_codi= parseInt(event.currentTarget.cells[1].children[0].dataset.elementId);
        let entidad : Entidad;
            entidad = new Entidad();
            entidad.ent_codi=this.ent_codi;
            $('#iconoEspera').show();     
        this.serviceEntidad.selectbyId(entidad).subscribe(res=>{
           this.nombre = res[0].ent_nomb;
           $('#iconoEspera').hide();     
           this.title="Editar Entidad";
           this.showData =false;
        });

    });
    
}

ngAfterViewInit()
    {
     
      this.showData=true;
      this.iniciarTablaEntidad();
     // this.showTabla=true;
    }

  public  ngOnInit() {  
        this.ent_codi=0;
        this.showData =true;
        this.title="Creación de Entidades";
        $('#dataEntidad').empty();
        $('#dataEntidad').DataTable().destroy();
        this.iniciarTablaEntidad();
        $('#iconoEspera').show();     
        this.serviceEntidad.select().subscribe(res=>{
            var table = $('#dataEntidad').DataTable();                   
            table.clear();
            table.rows.add(res);
            table.draw();     
            $('#iconoEspera').hide();     
        });        
       
        }       
  }