import React from 'react';
import Todo from './Todo.js'

export function TodoList(props) {

  const todos = [];

  props.todos.forEach((todo)=>{
    todos.push(<Todo onTodoDeletion={props.onTodoDeletion} key={todo.id} todo={todo}/>);
  });

  return(<div className="todo-list-container">
    <h1>{props.title}</h1>
    <div>{todos}</div>
  </div>);
}

export default TodoList;
