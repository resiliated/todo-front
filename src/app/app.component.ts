import { Component } from '@angular/core';
import { Todo, State } from './models';
import { TodoService } from './todo.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'TODO liste de Boris';
  todos: Todo[] = [];

  public get enumState(): typeof State {
      return State;
  }

  public getContent(state: State){
    if(state === State.TODO){
      return "Commencer";
    }

    if(state === State.PROGRESS){
      return "Terminer";
    }

    return "Etat incohérent";
  }

  constructor(public todoService: TodoService){
    this.todoService = todoService;
  }

  ngOnInit() {
    this.getTodos();
  }

  deleteTodo(id: number){
    this.todoService.deleteTodo(id).subscribe(res => {
      this.getTodos();
    });
  }

  createTodo(){
    this.todoService.createTodo().subscribe(res => {
      this.getTodos();
    });
  }

  getTodos(){
    this.todoService.getTodos().subscribe(todos =>{
      this.todos = todos;
      this.todos.sort((a,b) => {
        if(State.valueOf(a.state) < State.valueOf(b.state)){
          return -1;
        }
        if(State.valueOf(a.state) > State.valueOf(b.state)){
          return 1;
        }
        return 0;
      });
    });
  }
}
