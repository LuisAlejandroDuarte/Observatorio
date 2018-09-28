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
    pgd_codi:number;
    constructor (private servicePolitica:PoliticaService) {

    }


    onClicNueva() {
        this.title="Crear Nueva Política";
        this.showData =false;
        this.nombre="";
        this.descripcion="";

    }

    onClicVolver() {
        this.showData =true;

        $('#iconoEspera').show();     
     
        setTimeout(() => {           
            this.iniciarTablaPolitica();
            this.title="Descripción y creación de Políticas";
            this.servicePolitica.select().subscribe(res=>{
                var table = $('#dataPolitica').DataTable();                   
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
        let politica:Politica;
        politica = new Politica();
        politica.pgd_nomb = this.nombre;        
        politica.pgd_desc=this.descripcion;
        if ( this.pgd_codi==0)
        {      
            this.servicePolitica.insert(politica).subscribe(res=>{
                this.onClicVolver();
                $('#iconoEspera').hide();     
            });
        }       
        else
        {
            politica.pgd_codi=this.pgd_codi;
            this.servicePolitica.update(politica).subscribe(res=>{
                this.onClicVolver();
                $('#iconoEspera').hide();     
            });
        } 
    }

    iniciarTablaPolitica() {
        var tabla= $('#dataPolitica').DataTable( {  
            dom: '<"top"f>rt<"bottom"p><"clear">',          
            columns: [                  
                { title: "Nombre",data:"pgd_nomb" },
                { title: "Descripción",data:"pgd_desc" }               
            ],
            columnDefs:[{
                
                targets: [2],
                data: null,
                width:'0.5%',
                orderable: false,             
                    render:  ( data, type, full, meta )=>{       
                    return  '<button id="' + full.pgd_codi + '" class="btn btn-block btn-default btn-sm" title="Editar" data-element-id=' + full.pgd_codi + ' data-element-nombre="' + full.pgd_nomb + '"><i class="fa fa-pencil-square-o" aria-hidden="true" ></i></button>'          
            
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
        $('#dataPolitica tbody').on('click', 'tr',  (event) => {
            this.pgd_codi= parseInt(event.currentTarget.cells[2].children[0].dataset.elementId);
            let politica : Politica;
                politica = new Politica();
                politica.pgd_codi=this.pgd_codi;
                $('#iconoEspera').show();     
            this.servicePolitica.selectbyId(politica).subscribe(res=>{
            this.nombre = res[0].pgd_nomb;
            this.descripcion=res[0].pgd_desc;
            this.title="Editar Política";
            $('#iconoEspera').hide();     
            this.showData =false;
            });

        });
        
    }

    ngAfterViewInit()
    {
     
      this.showData=true;
      this.iniciarTablaPolitica();
     // this.showTabla=true;
    }

  public  ngOnInit() {  
        this.pgd_codi=0;
        this.showData =true;
        this.title="Descripción y creación de Políticas";
        $('#dataPolitica').empty();
        $('#dataPolitica').DataTable().destroy();
        this.iniciarTablaPolitica();
        $('#iconoEspera').show();     
        this.servicePolitica.select().subscribe(res=>{
            var table = $('#dataPolitica').DataTable();                   
            table.clear();
            table.rows.add(res);
            table.draw();     
            $('#iconoEspera').hide();     
        });        
       
        }

  }