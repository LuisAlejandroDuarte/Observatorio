import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import { Actividad } from "../modelo/actividad.modelo";
import { EntidadPolitica } from "../modelo/entidadPolitica.modelo";
import { EntidadPoliticaComponente } from "../modelo/entidadPoliticaComponente.modelo";
import { environment } from "src/environments/environment";


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
export class EntidadPoliticaComponenteService {
  baseUrl =environment.apiUrl;
 constructor(public http: HttpClient) {}
    

 insert(entidadPolitica: EntidadPoliticaComponente): Observable<EntidadPoliticaComponente> {
        
  //  let token = new tokens();
   
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
     return this.http.post<EntidadPoliticaComponente>(this.baseUrl + 'entidadPoliticaComponente.php?url=ingresar',JSON.stringify(entidadPolitica),httpOptions);
   }

   select(): Observable<EntidadPoliticaComponente[]> {
        
    //  let token = new tokens();
     
    
      //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
       return this.http.post<EntidadPoliticaComponente[]>(this.baseUrl + 'entidadPoliticaComponente.php?url=select',null,httpOptions);
     }

  selectbyId(entidadPoliticaComponente: EntidadPoliticaComponente): Observable<EntidadPoliticaComponente[]> {
    
  //  let token = new tokens();
    
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
      return this.http.post<EntidadPoliticaComponente[]>(this.baseUrl + 'entidadPoliticaComponente.php?url=selectbyId',JSON.stringify(entidadPoliticaComponente),httpOptions);
    }

//   update(actividad: Actividad): Observable<Actividad> {
                
      
//     //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
//     return this.http.post<Actividad>(this.baseUrl + 'actividad.php?url=update',JSON.stringify(actividad),httpOptions);
//   }
}