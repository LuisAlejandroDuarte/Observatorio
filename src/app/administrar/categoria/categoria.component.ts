import { Component } from "@angular/core";
import { CategoriaService } from "../../servicio/categoria.service";
import { Categoria } from "../../modelo/categoria.modelo";
declare const $: any;
@Component({
    selector: 'app-categoria',
    templateUrl: './categoria.component.html'    
  })
  export class CategoriaComponent {

    constructor(private serviceCategoria:CategoriaService) {

    }

    title:string;
    showData:boolean;
    nombre:string;    
    cat_codi:number;



    onClicNueva() {
        this.title="Crear Categoria";
        this.showData =false;
        this.nombre="";
      
    }

    onClicVolver() {
        this.showData =true;

       
     
        setTimeout(() => {           
            this.iniciarTablaCategoria();
            this.title="Creación de Categorias";
            $('#iconoEspera').show();     
            this.serviceCategoria.select().subscribe(res=>{
                var table = $('#dataCategoria').DataTable();                   
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
        let categoria:Categoria;
        categoria = new Categoria();
        categoria.cat_desc = this.nombre;                
        if ( this.cat_codi==0)
        {      
            this.serviceCategoria.insert(categoria).subscribe(res=>{
                this.onClicVolver();
                $('#iconoEspera').hide();     
            });
        }       
        else
        {
          categoria.cat_codi=this.cat_codi;
            this.serviceCategoria.update(categoria).subscribe(res=>{
                this.onClicVolver();
                $('#iconoEspera').hide();     
            });
        } 
    }

    iniciarTablaCategoria() {
    var tabla= $('#dataCategoria').DataTable( {  
        dom: '<"top"f>rt<"bottom"p><"clear">',          
        columns: [                  
            { title: "Nombre",data:"cat_desc" }            
        ],
        columnDefs:[{
            
            targets: [1],
            data: null,
            width:'0.5%',
            orderable: false,             
                render:  ( data, type, full, meta )=>{       
                return  '<button id="' + full.pgd_codi + '" class="btn btn-block btn-default btn-sm" title="Editar" data-element-id=' + full.cat_codi + ' data-element-nombre="' + full.cat_desc + '"><i class="fa fa-pencil-square-o" aria-hidden="true" ></i></button>'          
        
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
    $('#dataCategoria tbody').on('click', 'tr',  (event) => {
        this.cat_codi= parseInt(event.currentTarget.cells[1].children[0].dataset.elementId);
        let categoria : Categoria;
            categoria = new Categoria();
            categoria.cat_codi=this.cat_codi;
            $('#iconoEspera').show();     
        this.serviceCategoria.selectbyId(categoria).subscribe(res=>{
           this.nombre = res[0].cat_desc;
           $('#iconoEspera').hide();     
           this.title="Editar Categoria";
           this.showData =false;
        });

    });
    
}

ngAfterViewInit()
    {
     
      this.showData=true;
      this.iniciarTablaCategoria();
     // this.showTabla=true;
    }

  public  ngOnInit() {  
        this.cat_codi=0;
        this.showData =true;
        this.title="Creación de Categoriaes";
        $('#dataCategoria').empty();
        $('#dataCategoria').DataTable().destroy();
        this.iniciarTablaCategoria();
        $('#iconoEspera').show();     
        this.serviceCategoria.select().subscribe(res=>{
            var table = $('#dataCategoria').DataTable();                   
            table.clear();
            table.rows.add(res);
            table.draw();     
            $('#iconoEspera').hide();     
        });               
    }       

  }