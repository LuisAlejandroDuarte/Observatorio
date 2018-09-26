import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import { LoginObject, Session } from "./sesion.service";
import { Politica } from "../modelo/politica.modelo";



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };
@Injectable()
export class AuthenticationService {
 constructor(private http: HttpClient) {}
    

 insert(politica: Politica): Observable<Politica> {
        
  //  let token = new tokens();
   
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
     return this.http.post<Session>('api/Login/Ingresar',JSON.stringify(loginObj),httpOptions);
   }
}