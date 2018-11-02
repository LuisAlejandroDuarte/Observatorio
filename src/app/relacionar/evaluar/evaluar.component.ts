import { Component, ViewChild } from "@angular/core";
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { ArbolService } from "../../servicio/arbol.service";
import { Arbol } from "../../modelo/arbol.modelo";
import { jqxPanelComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxpanel";
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
   
    myTreeOnSelect(event: any): void {
        let args = event.args;
        let item  = this.myTree.getItem(event.args);
        let id =event.args.owner.selectedItem.id;
        let parentId =event.args.owner.selectedItem.parentId.substring(0,1);

        if (parentId=="b")
        {
            parentId =event.args.owner.selectedItem.id;
            let categoriaActividad = new  CategoriaActividad();
                categoriaActividad.cca_codi=parentId;

            this.serviceEvaluar.selectbyId(categoriaActividad).subscribe(res=>{

            });

        }

       

        if (this.counter > 1) {
            //this.myPanel.prepend('<div style="margin-top: 5px;">Selected: ' + item.label + '</div>');
        }
        this.counter++;
    };

  }