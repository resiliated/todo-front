import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Menus from './Components/Menus.js';
import TodoList from './Components/TodoList.js';
import TodoForm from './Components/TodoForm.js';
import './App.less';
const { Header, Content, Footer } = Layout;

export function App({URL_API}) {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(URL_API)
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
  }, [URL_API, setError, setIsLoaded, setTodos]);

  function onTodoCreation(title, content){
    setIsLoaded(false);
    fetch(URL_API, {
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
    setIsLoaded(false);
    fetch(URL_API+"/"+todoToRemove.id, {
      method: 'DELETE'
    }).then((result)=>{
      setTodos(todos.filter(todo =>{
          return todo.id !== todoToRemove.id;
        })
      );
      setIsLoaded(true);
    });
  }

  //TODO create service to CRUD operations
  function onTodoEdition(todoToUpdate){
    setIsLoaded(false);
    fetch(URL_API, {
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
    onTodoEdition(todo);
  }

  return (
    <Layout>
        <Spin spinning={!isLoaded} tip="chargement...">
            <BrowserRouter>
                <Header>
                    <Menus/>
                </Header>
                <Content>
                  <Routes>
                    <Route path="/" element={<TodoList onTodoDeletion={onTodoDeletion} onNextState={onNextState} title="Todo liste de Boris" todos={todos}/>} />
                    <Route path="/add" element={<TodoForm onTodoCreation={onTodoCreation} onTodoEdition={onTodoEdition}/>} />
                  </Routes>
                </Content>
            </BrowserRouter>
            <Footer>
              Boris Design ©2022 Created by me
            </Footer>
        </Spin>
    </Layout>
  );
}

export default App;
