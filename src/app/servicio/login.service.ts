import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import { LoginObject, Session } from "./sesion.service";
import { environment } from "src/environments/environment";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };
@Injectable()
export class LoginService {
  baseUrl =environment.apiUrl;
 constructor(private http: HttpClient) {}


 login(loginObj: LoginObject): Observable<Session> {
        
  //  let token = new tokens();
   
  
    //httpImage.headers.append('Authorization','Bearer ' + token.ObtenerToken());
     return this.http.post<Session>('api/Login/Ingresar',JSON.stringify(loginObj),httpOptions);
   }
}