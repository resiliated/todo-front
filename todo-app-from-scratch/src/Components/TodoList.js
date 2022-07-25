import React from 'react';
import Todo from './Todo.js'

export function TodoList(props) {

  const todos = [];

  props.todos.forEach((todo)=>{
    todos.push(<Todo onTodoDeletion={props.onTodoDeletion} onNextState={props.onNextState} onReset={props.onReset} key={todo.id} todo={todo}/>);
  });

  return(<div>{todos}</div>);
}

export default TodoList;
