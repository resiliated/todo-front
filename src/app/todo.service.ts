import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, State } from './models';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(public http: HttpClient) {}

  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>("http://localhost:8080/todo");
  }

  deleteTodo(id: number): Observable<Object>{
    return this.http.delete("http://localhost:8080/todo/"+id);
  }

  createTodo(): Observable<Object>{
    return this.http.post("http://localhost:8080/todo", {});
  }
}
