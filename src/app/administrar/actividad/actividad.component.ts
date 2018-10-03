import { Component } from "@angular/core";
import { ActividadService } from "../../servicio/actividad.service";
import { Actividad } from "../../modelo/actividad.modelo";
import { EPCCategoriaActividad } from "../../modelo/epcCategoriaActividad.modelo";
import { EPCCategoriaActividadService } from "../../servicio/epcCategoriaActividad.service";
declare const $: any;
@Component({
    selector: 'app-actividad',
    templateUrl: './actividad.component.html'    
  })
  export class ActividadComponent {

    constructor(private serviceActividad:ActividadService,
        private serviceValoracion:EPCCategoriaActividadService) {

    }

    title:string;
    showData:boolean;
    showDataTabla:boolean;
    nombre:string;    
    acg_codi:number;
    descripcion:string;
    columna:number;
    showValores:boolean;
    valoracion:string;
    inferior:number;
    superior:number;
    nombreActividad:string;
    onClicNueva() {
        this.title="Crear Actividad";
       
        this.nombre="";
        this.showDataTabla =false;
        this.showData=true;
        this.showValores=false;
    }

    onClicVolver() {
        this.showDataTabla =true;
        this.showData=false;
        this.showValores=false;
       
     
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
        actividad.acg_crca=this.descripcion;           
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

    iniciarTablaValores() {
        var tabla= $('#dataValores').DataTable( {  
            dom: '<"top"f>rt<"bottom"p><"clear">',          
            columns: [                  
                { title: "Valoración",data:"val_desc",width:"30%" },   
                { title: "Inferior",data:"val_infe",width:"3%" },            
                { title: "Superior",data:"val_supe",width:"3%" }            
            ],
            columnDefs:[{
                
                targets: [3],
                data: null,
                width:'0.5%',
                orderable: false,             
                    render:  ( data, type, full, meta )=>{       
                    return  '<button id="' + full.val_cons + '" class="btn btn-block btn-default btn-sm" title="Eliminar" data-element-id=' + full.val_cons + ' data-element-nombre="' + full.val_cons + '"><i class="fa fa-trash-o" aria-hidden="true" ></i></button>'          
            
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
        $('#dataValores tbody').on('click', 'tr',  (event) => {                       
           
        });
       
        
    }

    iniciarTablaActividad() {
    var tabla= $('#dataActividad').DataTable( {  
        dom: '<"top"f>rt<"bottom"p><"clear">',          
        columns: [                  
            { title: "Nombre",data:"acg_desc" },   
            { title: "Criterio de Calificación",data:"acg_crca" }            
        ],
        columnDefs:[{
            
            targets: [2],
            data: null,
            width:'0.5%',
            orderable: false,             
                render:  ( data, type, full, meta )=>{       
                return  '<button id="' + full.acg_codi + '" class="btn btn-block btn-default btn-sm" title="Editar" data-element-id=' + full.acg_codi + ' data-element-nombre="' + full.acg_desc + '"><i class="fa fa-pencil-square-o" aria-hidden="true" ></i></button>'          
        
                }
                                      
        },{
            
            targets: [3],
            data: null,
            width:'0.5%',
            orderable: false,             
                render:  ( data, type, full, meta )=>{       
                return  '<button id="' + full.acg_codi + '" class="btn btn-block btn-success btn-sm" title="Ver Valores" data-element-id=' + full.acg_codi + ' data-element-nombre="' + full.acg_desc + '"><i class="fa fa-plus-square-o" aria-hidden="true" ></i></button>'          
        
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
        
        this.acg_codi= parseInt(event.currentTarget.cells[2].children[0].dataset.elementId);
        this.nombreActividad =event.currentTarget.cells[2].children[0].dataset.elementNombre;
        if ( this.columna==2)
        {
                let actividad : Actividad;
                actividad = new Actividad();
                actividad.acg_codi=this.acg_codi;
                $('#iconoEspera').show();     
                this.serviceActividad.selectbyId(actividad).subscribe(res=>{
                    this.nombre = res[0].acg_desc;
                    this.descripcion = res[0].acg_crca;
                    $('#iconoEspera').hide();     
                    this.title="Editar Actividad";
                    this.showDataTabla =false;
                    this.showData=true;
                    this.showValores=false;
                });

        }

        if ( this.columna==3)
        {
            this.showDataTabla =false;
            this.showData=false;
            this.showValores=true;

            setTimeout(() => {          
                $('#dataValores').empty();
                
//                $('#dataValores').DataTable().destroy();
               
                let actividad = new EPCCategoriaActividad();
                    actividad.val_acge_codi=this.acg_codi;
                 this.serviceValoracion.selectbyId(actividad).subscribe(res=>{

                    $('#dataValores').empty();
                    this.iniciarTablaValores();
                    var table = $('#dataValores').DataTable();                   
                    table.clear();
                    table.rows.add(res);
                    table.draw();     
                    $('#iconoEspera').hide();       
                    this.title = this.nombreActividad;

                 }); 
            });
            


        }

       
    });
    $('#dataActividad tbody').on('click', 'td',  (event) => {
        this.columna=event.currentTarget.cellIndex;
    });
    
    }

    ngAfterViewInit()
    {
    
        this.showDataTabla =true;
        this.showData=false;
        this.showValores=false;
         this.iniciarTablaActividad();
    // this.showTabla=true;
    }

  public  ngOnInit() {  
        this.acg_codi=0;
        this.showDataTabla =true;
        this.showData=false;
        this.showValores=false;
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
  onClicVolverActividad() {
       this.onClicVolver();

  }
  onClicAgregarValor() {
    let actividad = new EPCCategoriaActividad();
        actividad.val_desc=this.valoracion;
        actividad.val_infe=this.inferior;
        actividad.val_supe=this.superior;
        actividad.val_acge_codi =  this.acg_codi;
        $('#iconoEspera').show();   
        this.serviceValoracion.insert(actividad).subscribe(res=>{
            this.serviceValoracion.selectbyId(actividad).subscribe(res2=>{

                $('#dataValores').empty();
                $('#dataValores').DataTable().destroy();
                this.iniciarTablaValores();
                var table = $('#dataValores').DataTable();                   
                table.clear();
                table.rows.add(res2);
                table.draw();     
                $('#iconoEspera').hide();         
            });
        });
    }
}