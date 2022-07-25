import React from 'react';

export function Todo(props){

  function handleTodoDeletion(){
    props.onTodoDeletion(props.todo);
  }

  function handleNextState(){
    props.onNextState(props.todo);
  }

  function getNextStateContent(){
    return props.todo.state === "TODO" ? "Commencer" : "Terminer";
  }

  function getTodoClassNames(){
    return "container todo " + props.todo.state;
  }

  function handleReset(){
    props.onReset(props.todo);
  }

  //TODO use same button to next and reset state
  return (<div class={getTodoClassNames()}>
    <h1>{props.todo.title}</h1>
    <h2>{props.todo.content}</h2>
    <p>Créée le: {props.todo.creation}</p>
    <button onClick={handleTodoDeletion}>Supprimer</button>
    <button onClick={handleNextState} className={props.todo.state !== "DONE" ? 'visible' : 'hidden'}>{getNextStateContent()}</button>
    <button onClick={handleReset} className={props.todo.state === "DONE" ? 'visible' : 'hidden'}>RAZ</button>
  </div>);
}

export default Todo;
