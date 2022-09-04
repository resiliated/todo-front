import React, { useState, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Navigation from './Components/Navigation.js';
import APIService from './APIService.js'
import './App.less';
const { Content, Footer } = Layout;

const Login = React.lazy(() => import('./Components/Login.js'));
const CategoryList = React.lazy(() => import('./Components/Category/CategoryList.js'));
const TodoList = React.lazy(() => import('./Components/Todo/TodoList.js'));
const TodoForm = React.lazy(() => import('./Components/Todo/TodoForm.js'));

export function App() {
    const [todos, setTodos] = useState([]);
    const [todoToEdit, setTodoToEdit] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    let navigate = useNavigate();

    function readTodos() {
        setIsLoaded(false);
        APIService.todo.readAll().then(todos => {
            setTodos(todos);
            setIsLoaded(true);
        });
    }

    function onNav(){
        setTodoToEdit(null);
    }

    function onLogout(){
        setTodos([]);
        setIsLoaded(true);
        setIsConnected(false);
        setTodoToEdit(null);
    }

    function onLogin(ids){
        setIsLoaded(false);
        APIService.login(ids.username, ids.password).then((response) => {
            if(response.status === 401){
                setIsLoaded(true);
                setError(response.statusText);
            }else{
                navigate("/list");
                readTodos();
                setIsConnected(true);
                setIsLoaded(true);
                setError(null);
            }
        });
    }

    function createTodo(todoToCreate){
        setIsLoaded(false);
        APIService.todo.create(todoToCreate).then(createdTodo => {
            setTodos(todos => [...todos, createdTodo]);
            navigate("/list");
            setIsLoaded(true);
        });
    }

    function updateTodo(todoToUpdate){
        setIsLoaded(false);
        APIService.todo.update(todoToUpdate).then(updatedTodo => {
            var currentTodos = [...todos];
            var index = currentTodos.findIndex(todo => todo.id === updatedTodo.id);
            currentTodos[index] = updatedTodo;
            setTodos(currentTodos);

            if(todoToEdit !== null){
                setTodoToEdit(null);
                navigate("/list");
            }

            setIsLoaded(true);
        });
    }

    function deleteTodo(todoTodoDelete){
        setIsLoaded(false);
        APIService.todo.delete(todoTodoDelete).then(response => {
            setTodos([...todos].filter(todo =>{ return todo.id !== todoTodoDelete.id}));
            setIsLoaded(true);
        });
    }

    function editTodo(todo){
        setTodoToEdit(todo);
        navigate("/add");
    }

    return (
        <Spin spinning={!isLoaded} tip="chargement...">
            <Layout>

               <Navigation onLogout={onLogout} onNav={onNav} isConnected={isConnected} />
                <Content>
                    <Routes>
                        <Route path="/" element={<Suspense fallback={<>...</>}> <Login onLogin={onLogin} isConnected={isConnected} error={error}/> </Suspense>} />
                        <Route path="/list" element={<Suspense fallback={<>...</>}><TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} editTodo={editTodo} title="Todo liste de Boris" /></Suspense>} />
                        <Route path="/category" element={<Suspense fallback={<>...</>}><CategoryList /></Suspense>} />
                        <Route path="/add" element={<Suspense fallback={<>...</>}><TodoForm createTodo={createTodo} updateTodo={updateTodo} todoToEdit={todoToEdit}/></Suspense>} />
                    </Routes>
                    <Footer>
                        <small>Boris Design ©2022 Created by me</small>
                    </Footer>
                </Content>
            </Layout>
        </Spin>
    );
}

export default App;
