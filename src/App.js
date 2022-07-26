import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { Spin } from 'antd';
import { Row, Col} from 'antd';
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
  }, [URL_API]);

  function onTodoCreation(title, content){
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
    fetch(URL_API+"/"+todoToRemove.id, {
      method: 'DELETE'
    }).then((result)=>{
      setTodos(todos.filter(todo =>{
          return todo.id !== todoToRemove.id;
        })
      );
    });
  }

  //TODO create service to CRUD opartions
  function onTodoEdition(todoToUpdate){
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
    <BrowserRouter>
        <Header style={{
          background: 'inherit',
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          top: 0,
          padding: 0
        }}>
          <Row>
            <Col span={22}><Menus /></Col>
            <Col span={2} style={{background: 'white'}}><Spin className={isLoaded ? "hidden": ""} /></Col>
          </Row>
        </Header>

        <Content style={{
           padding: '82px 20px'
         }}>
          <Routes>
            <Route path="/" element={<TodoList onTodoDeletion={onTodoDeletion} onNextState={onNextState} title="Todo liste de Boris" todos={todos}/>} />
            <Route path="/add" element={<TodoForm onTodoCreation={onTodoCreation} onTodoEdition={onTodoEdition}/>} />
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            position: 'fixed',
            bottom: 0,
            width: '100%'
          }}
        >
          Boris Design ©2022 Created by me
        </Footer>
    </BrowserRouter>
  );
}

export default App;
