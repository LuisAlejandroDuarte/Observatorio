import { Component } from "@angular/core";
import { ComponenteService } from "../../servicio/componente.service";
import { Componente } from "../../modelo/componente";
declare const $: any;
@Component({
    selector: 'app-componente',
    templateUrl: './componente.component.html'    
  })
  export class ComponenteComponent {

    constructor(private serviceComponente:ComponenteService) {

    }

    title:string;
    showData:boolean;
    nombre:string;    
    com_codi:number;



    onClicNueva() {
        this.title="Crear Componente";
        this.showData =false;
        this.nombre="";
      
    }

    onClicVolver() {
        this.showData =true;

       
     
        setTimeout(() => {  
            $('#iconoEspera').show();              
            this.iniciarTablaComponente();
            this.title="Creación de Componentes";
            this.serviceComponente.select().subscribe(res=>{
                var table = $('#dataComponente').DataTable();                   
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
        let componente:Componente;
        componente = new Componente();
        componente.com_desc = this.nombre;                
        if ( this.com_codi==0)
        {      
            this.serviceComponente.insert(componente).subscribe(res=>{
                this.onClicVolver();
                $('#iconoEspera').hide();     
            });
        }       
        else
        {
          componente.com_codi=this.com_codi;
            this.serviceComponente.update(componente).subscribe(res=>{
                this.onClicVolver();
                $('#iconoEspera').hide();     
            });
        } 
    }

    iniciarTablaComponente() {
    var tabla= $('#dataComponente').DataTable( {  
        dom: '<"top"f>rt<"bottom"p><"clear">',          
        columns: [                  
            { title: "Nombre",data:"com_desc" }            
        ],
        columnDefs:[{
            
            targets: [1],
            data: null,
            width:'0.5%',
            orderable: false,             
                render:  ( data, type, full, meta )=>{       
                return  '<button id="' + full.com_codi + '" class="btn btn-block btn-default btn-sm" title="Editar" data-element-id=' + full.com_codi + ' data-element-nombre="' + full.com_desc + '"><i class="fa fa-pencil-square-o" aria-hidden="true" ></i></button>'          
        
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
    $('#dataComponente tbody').on('click', 'tr',  (event) => {
        this.com_codi= parseInt(event.currentTarget.cells[1].children[0].dataset.elementId);
        let componente : Componente;
            componente = new Componente();
            componente.com_codi=this.com_codi;
            $('#iconoEspera').show();     
        this.serviceComponente.selectbyId(componente).subscribe(res=>{
           this.nombre = res[0].com_desc;
           $('#iconoEspera').hide();     
           this.title="Editar Componente";
           this.showData =false;
        });

    });
    
}

ngAfterViewInit()
    {
     
      this.showData=true;
      this.iniciarTablaComponente();
     // this.showTabla=true;
    }

  public  ngOnInit() {  
        this.com_codi=0;
        this.showData =true;
        this.title="Creación de Componentes";
        $('#dataComponente').empty();
        $('#dataComponente').DataTable().destroy();
        this.iniciarTablaComponente();
        $('#iconoEspera').show();     
        this.serviceComponente.select().subscribe(res=>{
            var table = $('#dataComponente').DataTable();                   
            table.clear();
            table.rows.add(res);
            table.draw();     
            $('#iconoEspera').hide();     
        });        
       
        }       
  }