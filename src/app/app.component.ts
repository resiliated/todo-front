import { Component } from '@angular/core';
import { Todo, State, Type } from './models';
import { TodoService } from './todo.service';
import { TypeService } from './type.service';
import { FormComponent } from './form/form.component';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'TODO liste de Boris';
  todos: Todo[] = [];
  types: Type[] = [];
  selectedTodo: Todo ;

  constructor(public todoService: TodoService, public typeService: TypeService, private dialog: MatDialog){
    this.todoService = todoService;
    this.typeService = typeService;
    this.selectedTodo = new Todo();
  }

  ngOnInit() {
    this.getTypes();
    this.getTodos();
  }

  public get enumState(): typeof State {
        return State;
  }

  public nextStepContent(state: State){
    if(state === State.TODO){
      return "Commencer";
    }

    if(state === State.PROGRESS){
      return "Terminer";
    }

    return "Etat incohérent";
  }

  public goBackStepContent(state: State){
    if(state === State.PROGRESS){
      return "RAZ";
    }

    if(state === State.DONE){
      return "Réouvrir";
    }

    return "Etat incohérent";
  }

  deleteTodo(id: number){
    this.todoService.deleteTodo(id).subscribe(res => {
      this.getTodos();
    });
  }

  createOrUpdateTodo(todo: Todo){
    this.todoService.updateTodo(todo).subscribe(res => {
      this.getTodos();
    });
  }


  openTodoForm(selection: Todo){
    this.selectedTodo = selection;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
            todo: this.selectedTodo,
            types: this.types,
            creation: true
        };
    const dialogRef = this.dialog.open(FormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data: any) => {
      console.log("type id " + data.type);
        if(data){
            this.selectedTodo.title = data.title;
            this.selectedTodo.content = data.content;
            this.selectedTodo.type.id = data.type;
                        console.log(this.selectedTodo);

            this.createOrUpdateTodo(this.selectedTodo);
        }
        this.selectedTodo = new Todo();
      }
    );
  }

  rollBackTodo(todo: Todo){
    if(todo.state === State.PROGRESS){
      todo.state = State.TODO;
    }else if(todo.state === State.DONE){
      todo.state = State.PROGRESS;
    }
    this.todoService.updateTodo(todo).subscribe(res => {
      this.getTodos();
    });
  }

  updateTodo(todo: Todo){
    if(todo.state === State.TODO){
      todo.state = State.PROGRESS;
    }else if(todo.state === State.PROGRESS){
      todo.state = State.DONE;
    }
    this.todoService.updateTodo(todo).subscribe(res => {
      this.getTodos();
    });
  }

  getTypes(){
    this.typeService.getTypes().subscribe(types =>{
      this.types = types;
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
