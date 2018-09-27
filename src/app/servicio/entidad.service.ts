import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import { Entidad } from "../modelo/Entidad.modelo";

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
export class EntidadService {
 constructor(public http: HttpClient) {}
    

 insert(entidad: Entidad): Observable<Entidad> {
        
  //  let token = new tokens();
   
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
     return this.http.post<Entidad>('http://localhost:8037/Observatorio/src/app/datos/entidad.php?url=ingresar',JSON.stringify(entidad),httpOptions);
   }

   select(): Observable<Entidad[]> {
        
    //  let token = new tokens();
     
    
      //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
       return this.http.post<Entidad[]>('http://localhost:8037/Observatorio/src/app/datos/entidad.php?url=select',null,httpOptions);
     }

  selectbyId(entidad: Entidad): Observable<Entidad> {
    
  //  let token = new tokens();
    
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
      return this.http.post<Entidad>('http://localhost:8037/Observatorio/src/app/datos/entidad.php?url=selectbyId',JSON.stringify(entidad),httpOptions);
    }

  update(entidad: Entidad): Observable<Entidad> {
                
      
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
    return this.http.post<Entidad>('http://localhost:8037/Observatorio/src/app/datos/entidad.php?url=update',JSON.stringify(entidad),httpOptions);
  }
}