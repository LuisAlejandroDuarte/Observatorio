import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import { Actividad } from "../modelo/actividad.modelo";
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
export class ActividadService {
  baseUrl =environment.apiUrl;
 constructor(public http: HttpClient) {}
    

 insert(actividad: Actividad): Observable<Actividad> {
        
  //  let token = new tokens();
   
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
     return this.http.post<Actividad>(this.baseUrl + 'actividad.php?url=ingresar',JSON.stringify(actividad),httpOptions);
   }

   select(): Observable<Actividad[]> {
        
    //  let token = new tokens();
     
    
      //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
       return this.http.post<Actividad[]>(this.baseUrl + 'actividad.php?url=select',null,httpOptions);
     }

  selectbyId(actividad: Actividad): Observable<Actividad> {
    
  //  let token = new tokens();
    
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
      return this.http.post<Actividad>(this.baseUrl + 'actividad.php?url=selectbyId',JSON.stringify(actividad),httpOptions);
    }

  update(actividad: Actividad): Observable<Actividad> {
                
      
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
    return this.http.post<Actividad>(this.baseUrl + 'actividad.php?url=update',JSON.stringify(actividad),httpOptions);
  }
}