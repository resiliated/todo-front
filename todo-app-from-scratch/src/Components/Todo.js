import React from 'react';

export function Todo(props){

  function handleTodoDeletion(){
    props.onTodoDeletion(props.todo);
  }

  return (<div className="container todo">
    <h1>{props.todo.title}</h1>
    <h2>{props.todo.content}</h2>
    <button onClick={handleTodoDeletion}>Supprimer</button>
  </div>);

}

export default Todo;
