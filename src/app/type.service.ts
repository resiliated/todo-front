import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Type } from './models';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  //API = "http://localhost:8080/type";
  //API = "/type";
  API = environment.apiUrl + "/type ";
  constructor(public http: HttpClient) { }

  getTypes(): Observable<Type[]>{
    return this.http.get<Type[]>(this.API);
  }
}
