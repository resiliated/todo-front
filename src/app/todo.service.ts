import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo} from './models';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  //API = "http://54.37.13.50:8080/todo";
  API = "http://localhost:8080/todo";

  constructor(public http: HttpClient) {}

  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.API);
  }

  deleteTodo(id: number): Observable<Object>{
    return this.http.delete(this.API+"/"+id);
  }

  createTodo(todo: Todo): Observable<Object>{
    return this.http.post(this.API, todo);
  }

  updateTodo(todo: Todo): Observable<Object>{
    return this.http.put(this.API, todo);
  }
}
