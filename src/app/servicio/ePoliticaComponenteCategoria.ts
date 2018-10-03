import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import { Actividad } from "../modelo/actividad.modelo";
import { EntidadPolitica } from "../modelo/entidadPolitica.modelo";
import { EntidadPoliticaComponente } from "../modelo/entidadPoliticaComponente.modelo";
import { EPoliticaComponenteCategoria } from "../modelo/ePoliticaComponenteCategoria";


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
export class EPoliticaComponenteCategoriaService {
 constructor(public http: HttpClient) {}
    

 insert(entidadPolitica: EPoliticaComponenteCategoria): Observable<EPoliticaComponenteCategoria> {
        
  //  let token = new tokens();
   
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
     return this.http.post<EPoliticaComponenteCategoria>('http://localhost:8037/Observatorio/src/app/datos/ePoliticaComponenteCategoria.php?url=ingresar',JSON.stringify(entidadPolitica),httpOptions);
   }

   select(): Observable<EPoliticaComponenteCategoria[]> {
        
    //  let token = new tokens();
     
    
      //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
       return this.http.post<EPoliticaComponenteCategoria[]>('http://localhost:8037/Observatorio/src/app/datos/ePoliticaComponenteCategoria.php?url=select',null,httpOptions);
     }

  selectbyId(ePoliticaComponenteCategoria: EPoliticaComponenteCategoria): Observable<EPoliticaComponenteCategoria[]> {
    
  //  let token = new tokens();
    
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
      return this.http.post<EPoliticaComponenteCategoria[]>('http://localhost:8037/Observatorio/src/app/datos/ePoliticaComponenteCategoria.php?url=selectbyId',JSON.stringify(ePoliticaComponenteCategoria),httpOptions);
    }

//   update(actividad: Actividad): Observable<Actividad> {
                
      
//     //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
//     return this.http.post<Actividad>('http://localhost:8037/Observatorio/src/app/datos/actividad.php?url=update',JSON.stringify(actividad),httpOptions);
//   }
}