import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import { Categoria } from "../modelo/categoria.modelo";
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
export class CategoriaService {
  baseUrl =environment.apiUrl;
 constructor(public http: HttpClient) {}
    

 insert(categoria: Categoria): Observable<Categoria> {
        
  //  let token = new tokens();
   
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
     return this.http.post<Categoria>(this.baseUrl + 'categoria.php?url=ingresar',JSON.stringify(categoria),httpOptions);
   }

   select(): Observable<Categoria[]> {
        
    //  let token = new tokens();
     
    
      //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
       return this.http.post<Categoria[]>(this.baseUrl + 'categoria.php?url=select',null,httpOptions);
     }

  selectbyId(categoria: Categoria): Observable<Categoria> {
    
  //  let token = new tokens();
    
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
      return this.http.post<Categoria>(this.baseUrl + 'categoria.php?url=selectbyId',JSON.stringify(categoria),httpOptions);
    }

  update(categoria: Categoria): Observable<Categoria> {
                
      
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
    return this.http.post<Categoria>(this.baseUrl + 'categoria.php?url=update',JSON.stringify(categoria),httpOptions);
  }
}