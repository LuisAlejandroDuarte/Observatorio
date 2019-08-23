import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import { Politica } from "../modelo/politica.modelo";
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
export class PoliticaService {
  baseUrl =environment.apiUrl;
 constructor(public http: HttpClient) {}
    

 insert(politica: Politica): Observable<Politica> {
        
  //  let token = new tokens();
   
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
     return this.http.post<Politica>(this.baseUrl + 'politica.php?url=ingresar',JSON.stringify(politica),httpOptions);
   }

   select(): Observable<Politica[]> {
        
    //  let token = new tokens();
     
    
      //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
       return this.http.post<Politica[]>(this.baseUrl + 'politica.php?url=select',null,httpOptions);
     }

  selectbyId(politica: Politica): Observable<Politica> {
    
  //  let token = new tokens();
    
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
      return this.http.post<Politica>(this.baseUrl + 'politica.php?url=selectbyId',JSON.stringify(politica),httpOptions);
    }

  update(politica: Politica): Observable<Politica> {
                
      
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
    return this.http.post<Politica>(this.baseUrl + 'politica.php?url=update',JSON.stringify(politica),httpOptions);
  }
}