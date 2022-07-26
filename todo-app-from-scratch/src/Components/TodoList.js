import React from 'react';
import Todo from './Todo.js'

export function TodoList(props) {

  const todos = [];

  function getPriority(todo){
      var value = -1;

      switch (todo.state) {
        case "TODO":
          value = 0;
          break;
        case "PROGRESS":
          value = 1;
          break;
        case "DONE":
          value = 2;
          break;
        default:
          break;
      }
      return value;
    }

  props.todos.sort(function(a, b) {
    return getPriority(a) - getPriority(b);
  });

  props.todos.forEach((todo)=>{
    todos.push(<Todo onTodoDeletion={props.onTodoDeletion} onNextState={props.onNextState} onReset={props.onReset} key={todo.id} todo={todo}/>);
  });

  return(<div>{todos}</div>);
}

export default TodoList;
