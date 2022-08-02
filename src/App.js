import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Login from './Components/Login.js';
import Menus from './Components/Menus.js';
import TodoList from './Components/TodoList.js';
import TodoForm from './Components/TodoForm.js';
import APIService from './APIService.js'
import './App.less';
const { Header, Content, Footer } = Layout;

export function App({URL_API}) {
    const [userId, setUserId] = useState(null);
    const [todos, setTodos] = useState([]);
    const [todoToEdit, setTodoToEdit] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);

    let navigate = useNavigate();

    const readTodos = useCallback((userId) => {
        APIService.readAll(userId).then(todos => {
            setTodos(todos);
        });
      },[setTodos]);

    useEffect(() => {
        if(userId !== null){
            readTodos(userId);
        }
    }, [userId, readTodos]);

    function onLogin(ids){
        setIsLoaded(false);
        APIService.login(ids.username, ids.password).then(user => {
            setUserId(user.id);
            navigate("/list");
            setIsLoaded(true);
        });
    }

    function createTodo(todoToCreate){
        todoToCreate.userId = userId;
        setIsLoaded(false);
        APIService.create(todoToCreate).then(createdTodo => {
            setTodos(todos => [...todos, createdTodo]);
            navigate("/list");
            setIsLoaded(true);
        });
    }

    function updateTodo(todoToUpdate){
        setIsLoaded(false);
        APIService.update(todoToUpdate).then(updatedTodo => {
            var currentTodos = [...todos];
            var index = currentTodos.findIndex(todo => todo.id === updatedTodo.id);
            currentTodos[index] = updatedTodo;
            setTodos(currentTodos);

            if(todoToEdit !== null){
                setTodoToEdit(null);
                navigate("/list");
                setIsLoaded(true);
            }
        });
    }

    function deleteTodo(todoTodoDelete){
        setIsLoaded(false);
        APIService.delete(todoTodoDelete).then(response => {
            setTodos([...todos].filter(todo =>{ return todo.id !== todoTodoDelete.id}));
            setIsLoaded(true);
        });
    }

    function editTodo(todo){
        setTodoToEdit(todo);
        navigate("/add");
    }

    return (
        <Layout>
            <Spin spinning={!isLoaded} tip="chargement...">
                <Header>
                    <Menus userId={userId !== null ? true : false} />
                </Header>
                <Content>
                  <Routes>
                    <Route path="/" element={<Login onLogin={onLogin}/>} />
                    <Route path="/list" element={<TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} editTodo={editTodo} title="Todo liste de Boris" />} />
                    <Route path="/add" element={<TodoForm createTodo={createTodo} updateTodo={updateTodo} todoToEdit={todoToEdit}/>} />
                  </Routes>
                </Content>
                <Footer>
                  Boris Design ©2022 Created by me
                </Footer>
            </Spin>
        </Layout>
    );
}

export default App;
