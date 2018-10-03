import { Component, ViewChild } from "@angular/core";
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { jqxExpanderComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxexpander';
import { ArbolService } from "../../servicio/arbol.service";
import { Arbol } from "../../modelo/arbol.modelo";
declare const $: any;
@Component({
    selector: 'app-evaluar',
    templateUrl: './evaluar.component.html'    
  })
  export class EvaluarComponent {

    arbol:Arbol[];
  
    constructor(private serviceArbol:ArbolService) {

    }


    ngOnInit() {   
        this.serviceArbol.generar().subscribe(res=>{
           
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
  }