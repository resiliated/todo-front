import React, { useState, useEffect } from 'react';
import TodoList from './Components/TodoList.js';
import TodoForm from './Components/TodoForm.js';

export function App(props) {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(props.URL_API)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTodos(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function onTodoCreation(title, content){
    fetch(props.URL_API, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
      })
    }).then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTodos(todos => [...todos, result]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  function onTodoDeletion(todoToRemove){
    fetch(props.URL_API+"/"+todoToRemove.id, {
      method: 'DELETE'
    }).then((result)=>{
      setTodos(todos.filter(todo =>{
          return todo.id !== todoToRemove.id;
        })
      );
    });
  }

  return (
    <div>
      <TodoForm onTodoCreation={onTodoCreation} />
      <TodoList onTodoDeletion={onTodoDeletion} title="Todo liste de Boris" todos={todos}/>
    </div>
  );
}

export default App;
