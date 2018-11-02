import { Component, ViewChild } from "@angular/core";
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { ArbolService } from "../../servicio/arbol.service";
import { Arbol } from "../../modelo/arbol.modelo";
import { jqxPanelComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxpanel";
import { jqxGridComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid";
import { EvaluarService } from "src/app/servicio/evaluar.service";
import { CategoriaActividad } from "src/app/modelo/categoriaActividad.modelo";
declare const $: any;
@Component({
    selector: 'app-evaluar',
    templateUrl: './evaluar.component.html'    
  })

  export class EvaluarComponent {

    @ViewChild('myTree') myTree: jqxTreeComponent;
    @ViewChild('myPanel') myPanel: jqxPanelComponent;

    arbol:Arbol[];
    anchoArbol:string;
    alturaArbol:string;
    puntaje:string;
    categoriaActividad:CategoriaActividad;
    habilitarInputPuntaje:boolean;
    constructor(private serviceArbol:ArbolService,
        private serviceEvaluar:EvaluarService) {

    }


    ngOnInit() {   
        this.anchoArbol= (screen.width * 0.4).toString();
        this.alturaArbol=(screen.height * 0.4).toString();
        $('#iconoEspera').show();   
        this.serviceArbol.generar().subscribe(res=>{
            $('#iconoEspera').hide();   
            this.data=res;
            this.source.localdata=this.data;
            this.dataAdapter = new jqx.dataAdapter(this.source, { autoBind: true });
            // get the tree items. The first parameter is the item's id. The second parameter is the parent item's id. The 'items' parameter represents 
            // the sub items collection name. Each jqxTree item has a 'label' property, but in the JSON data, we have a 'text' field. The last parameter 
            // specifies the mapping between the 'text' and 'label' fields.  
            this.records= this.dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
        }); 
     }

    

    data: any[] = []
    // prepare the data
    source = {
        datatype: 'json',
        datafields: [
            { name: 'id' },
            { name: 'parentid' },
            { name: 'text' },
            { name: 'value' }
           
        ],
        id: 'id',
        localdata: this.data
    };
    // create data adapter & perform Data Binding.
    dataAdapter = new jqx.dataAdapter(this.source, { autoBind: true });
    // get the tree items. The first parameter is the item's id. The second parameter is the parent item's id. The 'items' parameter represents 
    // the sub items collection name. Each jqxTree item has a 'label' property, but in the JSON data, we have a 'text' field. The last parameter 
    // specifies the mapping between the 'text' and 'label' fields.  
    records: any = this.dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);


    counter: number = 0;

    source2: any =
    {
        datatype: 'array',
        datafields: [
            { name: 'val_desc', type: 'string' },
            { name: 'val_infe', type: 'float' },
            { name: 'val_supe', type: 'float' }          
        ],
        id: 'cca_codi',
        localdata: null
    };
    dataAdapter2: any = new jqx.dataAdapter(this.source2);
	getWidth() : any {
		if (document.body.offsetWidth < 850) {
			return '90%';
		}
		
		return 850;
	}
    columns: any[] =
    [
        { text: 'Descripción', datafield: 'val_desc', width: 350 },
        { text: 'Valor Inferior', datafield: 'val_infe', width: 100 },
        { text: 'Valor Superior', datafield: 'val_supe', width: 100 }      
    ];
   
    myTreeOnSelect(event: any): void {
        this.habilitarInputPuntaje=true;
        let args = event.args;
        let item  = this.myTree.getItem(event.args);
        let id =event.args.owner.selectedItem.id;
        if (event.args.owner.selectedItem.parentId.toString().length==1) return;

        let parentId =event.args.owner.selectedItem.parentId.substring(0,1);
        this.source2.localdata=null;
        this.dataAdapter2= new jqx.dataAdapter(this.source2);
        this.puntaje="";
       
        if (parentId=="b")
        {
            parentId =event.args.owner.selectedItem.id;
             this.categoriaActividad = new  CategoriaActividad();
             this.categoriaActividad.cca_codi=parentId;
             this.categoriaActividad.cca_acge_codi = event.args.owner.selectedItem.value;

            this.serviceEvaluar.selectbyId(this.categoriaActividad).subscribe(res=>{
            this.source2.localdata=res;
            this.dataAdapter2= new jqx.dataAdapter(this.source2);
            
                this.serviceEvaluar.selectPuntaje(this.categoriaActividad).subscribe(res2=>{
                    this.habilitarInputPuntaje=false;
                    this.puntaje= res2[0].cca_punt.toString();
                });

               
            });

        }          
    };

    onClicValor() {
        let cate = new CategoriaActividad();
        cate = this.categoriaActividad;
        cate.cca_punt=parseFloat(this.puntaje);
        $('#iconoEspera').show();   
        this.serviceEvaluar.update(cate).subscribe(res=>{
            $('#iconoEspera').hide();   
        })

    }

  }