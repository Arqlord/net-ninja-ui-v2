import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  addUser(user:any):Observable<any> {
    return this._http.post('https://localhost:7112/api/Users', user);
  }

  getUsers():Observable<any[]> {
    return this._http.get<any[]>('https://localhost:7112/api/users');
  }

}
