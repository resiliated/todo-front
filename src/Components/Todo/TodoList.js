import React, {useEffect, useState, useContext } from 'react';
import { TodosContext } from '../../Context.js';
import { useSearchParams, useNavigate } from "react-router-dom";
import { Radio, PageHeader, Space, List, Tag } from 'antd';
import Todo from './Todo.js'
import APIService from '../../APIService.js'
import TodoHelpers from '../../TodoHelpers.js'

export function TodoList() {

    const
    [filter, setFilter] = useState(TodoHelpers.getPriority({state: "ALL"})),
    [todos, setTodos] = useContext(TodosContext),
    [searchParams] = useSearchParams(),
    navigate = useNavigate();

    useEffect(() => {
        APIService.todo.readAll(searchParams.get('categoryId')).then(todos => {
            setTodos(todos);
        });
    }, [searchParams, setTodos]);

    function onTodoUpdate(todoToUpdate){
        APIService.todo.update(todoToUpdate).then(updatedTodo => {
            var
            currentTodos = [...todos],
            index = currentTodos.findIndex(todo => todo.id === updatedTodo.id);

            currentTodos[index] = updatedTodo;
            setTodos(currentTodos);
        });
    }

    function onTodoDelete(todoToDelete){
        APIService.todo.delete(todoToDelete).then(response => {
            setTodos([...todos].filter(todo =>{ return todo.id !== todoToDelete.id}));
        });
    }

    function onTodoEdit(todoToEdit){
        navigate("/add?todoId=" +  todoToEdit.id);
    }

    function onChangeFilter(e){
        setFilter(e.target.value);
    }

    return(
        <div>
            <PageHeader
              title="Status todo"
              subTitle=""
              className="site-page-header"
            >
                <Radio.Group key="1" onChange={onChangeFilter} value={filter}>
                    <Space direction="vertical">
                        <Radio key="10" value={TodoHelpers.getPriority({status: "ALL"})}>Tout ({todos.length})</Radio>
                        <Radio key="11" value={TodoHelpers.getPriority({status: 0})}><Tag color={TodoHelpers.getStateColor({status: 0})}>{TodoHelpers.getStateContent({status: 0})}</Tag> ({todos.filter(todo => todo.status === 0 ).length} / {todos.length})</Radio>
                        <Radio key="12" value={TodoHelpers.getPriority({status: 1})}><Tag color={TodoHelpers.getStateColor({status: 1})}>{TodoHelpers.getStateContent({status: 1})}</Tag> ({todos.filter(todo => todo.status === 1 ).length} / {todos.length})</Radio>
                        <Radio key="13" value={TodoHelpers.getPriority({status: 2})}><Tag color={TodoHelpers.getStateColor({status: 2})}>{TodoHelpers.getStateContent({status: 2})}</Tag> ({todos.filter(todo => todo.status === 2 ).length} / {todos.length})</Radio>
                    </Space>
                </Radio.Group>
            </PageHeader>
            <List
                style={{marginBottom: 100}}
                grid={{
                  gutter: 24,
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 3,
                  xxl: 3,
                }}
                dataSource={todos.sort((a,b) => TodoHelpers.getPriority(a) - TodoHelpers.getPriority(b) ).filter(todo => TodoHelpers.getPriority(todo) === filter || filter === TodoHelpers.getPriority({state: todo}))}
                    renderItem={(todo) => (
                        <List.Item>
                            <Todo onTodoUpdate={onTodoUpdate} onTodoDelete={onTodoDelete} onTodoEdit={onTodoEdit} key={todo.id} todo={todo}/>
                        </List.Item>
                     )}
                />
        </div>
    );
}

export default TodoList;
