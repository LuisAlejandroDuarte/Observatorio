import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import { Actividad } from "../modelo/actividad.modelo";
import { EntidadPolitica } from "../modelo/entidadPolitica.modelo";
import { EntidadPoliticaComponente } from "../modelo/entidadPoliticaComponente.modelo";
import { EPoliticaComponenteCategoria } from "../modelo/ePoliticaComponenteCategoria";
import { EPCCategoriaActividad } from "../modelo/epcCategoriaActividad.modelo";
import { CategoriaActividad } from "../modelo/categoriaActividad.modelo";


// header('Content-type: application/json');
// header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8',
    'Access-Control-Allow-Origin':'No',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers',   
    'Accept': 'application/json'})
  };
@Injectable()
export class CategoriaActividadService {
 constructor(public http: HttpClient) {}
    

 insert(categoriaActividad: CategoriaActividad): Observable<CategoriaActividad> {
        
  //  let token = new tokens();
   
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
     return this.http.post<CategoriaActividad>('http://localhost:8037/Observatorio/src/app/datos/epcCategoriaActividad.php?url=ingresar',JSON.stringify(categoriaActividad),httpOptions);
   }

   select(): Observable<CategoriaActividad[]> {
        
    //  let token = new tokens();
     
    
      //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
       return this.http.post<CategoriaActividad[]>('http://localhost:8037/Observatorio/src/app/datos/epcCategoriaActividad.php?url=select',null,httpOptions);
     }

  selectbyId(categoriaActividad: CategoriaActividad): Observable<CategoriaActividad[]> {
    
  //  let token = new tokens();
    
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
      return this.http.post<CategoriaActividad[]>('http://localhost:8037/Observatorio/src/app/datos/epcCategoriaActividad.php?url=selectbyId',JSON.stringify(categoriaActividad),httpOptions);
    }

//   update(actividad: Actividad): Observable<Actividad> {
                
      
//     //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
//     return this.http.post<Actividad>('http://localhost:8037/Observatorio/src/app/datos/actividad.php?url=update',JSON.stringify(actividad),httpOptions);
//   }
}