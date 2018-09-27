import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import { Componente } from "../modelo/componente";


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
export class ComponenteService {
 constructor(public http: HttpClient) {}
    

 insert(componente: Componente): Observable<Componente> {
        
  //  let token = new tokens();
   
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
     return this.http.post<Componente>('http://localhost:8037/Observatorio/src/app/datos/componente.php?url=ingresar',JSON.stringify(componente),httpOptions);
   }

   select(): Observable<Componente[]> {
        
    //  let token = new tokens();
     
    
      //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
       return this.http.post<Componente[]>('http://localhost:8037/Observatorio/src/app/datos/componente.php?url=select',null,httpOptions);
     }

  selectbyId(componente: Componente): Observable<Componente> {
    
  //  let token = new tokens();
    
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
      return this.http.post<Componente>('http://localhost:8037/Observatorio/src/app/datos/componente.php?url=selectbyId',JSON.stringify(componente),httpOptions);
    }

  update(componente: Componente): Observable<Componente> {
                
      
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
    return this.http.post<Componente>('http://localhost:8037/Observatorio/src/app/datos/componente.php?url=update',JSON.stringify(componente),httpOptions);
  }
}