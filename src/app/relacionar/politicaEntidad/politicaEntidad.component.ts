import { Component } from "@angular/core";
import { PoliticaService } from "../../servicio/politica.service";
import { Politica } from "../../modelo/politica.modelo";
import { EntidadService } from "../../servicio/entidad.service";
import { Entidad } from "../../modelo/Entidad.modelo";
import { EntidadPoliticaService } from "../../servicio/entidadPolitica.service";
import { EntidadPolitica } from "../../modelo/entidadPolitica.modelo";
import * as _moment from 'moment';
import { ComponenteService } from "../../servicio/componente.service";
import { Componente } from "../../modelo/componente";
import { EntidadPoliticaComponente } from "../../modelo/entidadPoliticaComponente.modelo";
import { EntidadPoliticaComponenteService } from "../../servicio/entidadPoliticaComponente.service";
declare const $: any;
const moment =  _moment;
@Component({
    selector: 'app-politicaentidad',
    templateUrl: './politicaEntidad.component.html'    
  })
  export class PoliticaEntidadComponent {
    listPolitica:Politica[];
    selPolitica:Politica;
    listEntidad:Entidad[];
    listComponente:Componente[];
    selComponente:Componente;
    selEntidad:Entidad;
    fechaInicio:Date;
    fechaFin:Date;
    showEntidadPolitica:boolean;
    showComponente:boolean;
    showCategoria:boolean;
    showActividad:boolean;
    epg_codi:number;
    epc_codi:number;


    constructor(private servicePolitica:PoliticaService,private serviceEntidad:EntidadService,
      private serviceEntidadPolitica:EntidadPoliticaService,
      private serviceComponente:ComponenteService,
      private serviceEntidadPoliticaComponente:EntidadPoliticaComponenteService) {

    }

    iniciarTablaComponente() {
      var tabla= $('#dataComponente').DataTable( {  
          dom: '<"top"f>rt<"bottom"p><"clear">',          
          columns: [                  
              { title: "Componente",data:"com_desc" },              
              { title: "Puntaje",data:"epc_cali" },
          ],
          columnDefs:[{
              
              targets: [2],
              data: null,
              width:'0.5%',
              orderable: false,             
                  render:  ( data, type, full, meta )=>{       
                   return  '<button id="' + full.pgd_codi + '" class="btn btn-block btn-default btn-sm" title="Editar" data-element-id=' + full.pgd_codi + ' data-element-nombre="' + full.pgd_nomb + '"><i class="fa fa-pencil-square-o" aria-hidden="true" ></i></button>'          
          
                  }
                                        
          },{
              
            targets: [3],
            data: null,
            width:'0.5%',
            orderable: false,             
                render:  ( data, type, full, meta )=>{       
                return  '<button id="' + full.pgd_codi + '" class="btn btn-block btn-default btn-sm" title="Editar" data-element-id=' + full.pgd_codi + ' data-element-nombre="' + full.pgd_nomb + '"><i class="fa fa-trash" aria-hidden="true" ></i></button>'          
        
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
        this.epc_codi= parseInt(event.currentTarget.cells[2].children[0].dataset.elementId);
        this.showEntidadPolitica=false;
        this.showComponente =true;
        this.showActividad=false;
        this.showCategoria=false;

      });
      
  }

    iniciarTablaEntidadPolitica() {
      var tabla= $('#dataEntidadPolitica').DataTable( {  
          dom: '<"top"f>rt<"bottom"p><"clear">',          
          columns: [                  
              { title: "Política",data:"pgd_nomb" },
              { title: "Entidad",data:"ent_nomb" },
              { title: "Inicio",data:"epg_fini" },
              { title: "Fin",data:"epg_ffin" },
              { title: "Puntaje",data:"epg_punt" },
          ],
          columnDefs:[{
              
              targets: [5],
              data: null,
              width:'0.5%',
              orderable: false,             
                  render:  ( data, type, full, meta )=>{       
                   return  '<button id="' + full.pgd_codi + '" class="btn btn-block btn-default btn-sm" title="Editar" data-element-id=' + full.pgd_codi + ' data-element-nombre="' + full.pgd_nomb + '"><i class="fa fa-pencil-square-o" aria-hidden="true" ></i></button>'          
          
                  }
                                        
          },{
              
            targets: [6],
            data: null,
            width:'0.5%',
            orderable: false,             
                render:  ( data, type, full, meta )=>{       
                return  '<button id="' + full.pgd_codi + '" class="btn btn-block btn-default btn-sm" title="Editar" data-element-id=' + full.pgd_codi + ' data-element-nombre="' + full.pgd_nomb + '"><i class="fa fa-trash" aria-hidden="true" ></i></button>'          
        
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
      $('#dataEntidadPolitica tbody').on('click', 'tr',  (event) => {       
        this.epg_codi= parseInt(event.currentTarget.cells[5].children[0].dataset.elementId);
        this.showEntidadPolitica=false;
        this.showComponente =true;
        this.showActividad=false;
        this.showCategoria=false;
        $('#dataComponente').empty();
        $('#dataComponente').DataTable().destroy();      
        setTimeout(() => { 
          this.serviceComponente.select().subscribe(res=>{
            this.listComponente=res;
          });
          this.iniciarTablaComponente();
        });
        
      });
      
  }

    ngOnInit(): void {  
      this.showEntidadPolitica=true;
      $('#dataEntidadPolitica').empty();
     // $('#dataEntidadPolitica').DataTable().destroy();
      this.iniciarTablaEntidadPolitica();
      moment.locale('es');
      this.servicePolitica.select().subscribe(res=>{
          this.listPolitica = res;
      this.serviceEntidad.select().subscribe(res2=>{
            this.listEntidad = res2;

            this.serviceEntidadPolitica.select().subscribe(res3=>{
             var table = $('#dataEntidadPolitica').DataTable();                   
             table.clear();
             table.rows.add(res3);
             table.draw();     
            })
           
        });

      });
    }

    ngAfterViewInit()
    {
      
     
      this.iniciarTablaEntidadPolitica();
      this.iniciarTablaComponente();
      setTimeout(() => { 
        //$('#dataEntidadPolitica').empty();
     // $('#dataEntidadPolitica').DataTable().destroy();       
      //  this.iniciarTablaEntidadPolitica();
      });
         
     
     // this.showTabla=true;
    }

    onClicAgregar() {
      this.showEntidadPolitica=true;
      let entidad : EntidadPolitica;
        entidad = new EntidadPolitica();
        entidad.epg_pgdi_codi = this.selPolitica.pgd_codi;        
        entidad.epg_enti_codi = this.selEntidad.ent_codi;
        entidad.epg_fini=moment(this.fechaInicio).toDate();
        entidad.epg_ffin=moment(this.fechaFin).toDate();
        entidad.epg_punt=0;
        $('#iconoEspera').show();     
      this.serviceEntidadPolitica.insert(entidad).subscribe(res=>{
        $('#iconoEspera').hide();  
        this.serviceEntidadPolitica.select().subscribe(res3=>{
          var table = $('#dataEntidadPolitica').DataTable();                   
          table.clear();
          table.rows.add(res3);
          table.draw();     
         }) 
        
      });
    }

    volverPolitica() {
      this.showEntidadPolitica=true;
      this.showComponente =false;
      this.showActividad=false;
      this.showCategoria=false;
      setTimeout(() => { 
        this.iniciarTablaEntidadPolitica();
        $('#iconoEspera').show();     
        this.serviceEntidadPolitica.select().subscribe(res3=>{
          var table = $('#dataEntidadPolitica').DataTable();                   
          table.clear();
          table.rows.add(res3);
          table.draw();     
          $('#iconoEspera').hide();     
         }) 
      });
    }

    onClicAgregarEntidadPoliticaComponente() 
    { 
     
      let entidad : EntidadPoliticaComponente;
        entidad = new EntidadPoliticaComponente();
        entidad.epc_enpg_codi = this.epg_codi;        
        entidad.epc_comp_codi = this.selComponente.com_codi;        
        entidad.epc_cali=0;
        $('#iconoEspera').show();     
      this.serviceEntidadPoliticaComponente.insert(entidad).subscribe(res=>{
    
        this.serviceEntidadPoliticaComponente.select().subscribe(res3=>{
          var table = $('#dataComponente').DataTable();                   
          table.clear();
          table.rows.add(res3);
          table.draw();     
          $('#iconoEspera').hide();  
         }) 
        
      });
    }
  }