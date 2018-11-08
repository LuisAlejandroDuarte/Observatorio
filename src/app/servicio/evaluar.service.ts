import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import { Actividad } from "../modelo/actividad.modelo";
import { Arbol } from "../modelo/arbol.modelo";
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
export class EvaluarService {
 constructor(public http: HttpClient) {}
    

 

  selectbyId(categoria: CategoriaActividad): Observable<EPCCategoriaActividad[]> {
    
  //  let token = new tokens();
    
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
      return this.http.post<EPCCategoriaActividad[]>('http://localhost:8037/Observatorio/src/app/datos/evaluar.php?url=selectbyId',JSON.stringify(categoria),httpOptions);
    }


    selectPuntaje(categoria: CategoriaActividad): Observable<CategoriaActividad[]> {

          return this.http.post<CategoriaActividad[]>('http://localhost:8037/Observatorio/src/app/datos/evaluar.php?url=selectbyPuntaje',JSON.stringify(categoria),httpOptions);
        }
  
    update(categoria: CategoriaActividad): Observable<CategoriaActividad[]> {
          return this.http.post<CategoriaActividad[]>('http://localhost:8037/Observatorio/src/app/datos/evaluar.php?url=update',JSON.stringify(categoria),httpOptions);
        }            
     updatePolitica(): Observable<CategoriaActividad[]> {
      return this.http.post<CategoriaActividad[]>('http://localhost:8037/Observatorio/src/app/datos/evaluar.php?url=updatePolitica',null,httpOptions);
    }  
}