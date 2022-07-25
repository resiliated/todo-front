import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header.js';
import TodoList from './Components/TodoList.js';
import TodoForm from './Components/TodoForm.js';
import './App.less';


export function App(props) {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    fetch(props.URL_API)
      .then(res => res.json())
      .then(
        (todos) => {
          setIsLoaded(true);
          setTodos(todos);
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
        (createdTodo) => {
          setIsLoaded(true);
          setTodos(todos => [...todos, createdTodo]);
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

  //TODO create service to CRUD opartions
  function updateTodo(todoToUpdate){
    fetch(props.URL_API, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoToUpdate)
      }).then(res => res.json())
      .then(
        (updatedTodo) => {
          setIsLoaded(true);
          setTodos(todos.filter(todo =>{
              return todo.id !== updatedTodo.id;
            })
          );
          setTodos(todos => [...todos, updatedTodo]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
    );
  }

  function onNextState(todo){
    switch (todo.state) {
      case "TODO":
        todo.state = "PROGRESS";
        break;
      case "PROGRESS":
        todo.state = "DONE";
        break;
      case "DONE":
        todo.state = "TODO";
        break;
    }
    updateTodo(todo);
  }

  return (
    <BrowserRouter>
      <div>
        <Header/>
          <div className="main-container site-card-border-less-wrapper">
            <Routes>
              <Route path="/" element={<TodoList onTodoDeletion={onTodoDeletion} onNextState={onNextState} title="Todo liste de Boris" todos={todos}/>} />
              <Route path="/add" element={<TodoForm onTodoCreation={onTodoCreation}/>} />
            </Routes>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
