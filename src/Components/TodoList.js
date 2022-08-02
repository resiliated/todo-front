import React, { useState} from 'react';
import { Radio, PageHeader, Space, List, Tag } from 'antd';
import Todo from './Todo.js'
import TodoHelpers from '../TodoHelpers.js'

export function TodoList({todos, updateTodo, deleteTodo, editTodo}) {

    const [filter, setFilter] = useState(TodoHelpers.getPriority({state: "ALL"}));

    function onTodoUpdate(todoToUpdate){
        updateTodo(todoToUpdate);
    }

    function onTodoDelete(todoToDelete){
        deleteTodo(todoToDelete);
    }

    function onTodoEdit(todoToEdit){
        editTodo(todoToEdit);
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
                        <Radio key="10" value={TodoHelpers.getPriority({state: "ALL"})}>Tout ({todos.length})</Radio>
                        <Radio key="11" value={TodoHelpers.getPriority({state: "TODO"})}><Tag color={TodoHelpers.getStateColor({state: 'TODO'})}>{TodoHelpers.getStateContent({state: 'TODO'})}</Tag> ({todos.filter(todo => todo.state === "TODO" ).length} / {todos.length})</Radio>
                        <Radio key="12" value={TodoHelpers.getPriority({state: "PROGRESS"})}><Tag color={TodoHelpers.getStateColor({state: 'PROGRESS'})}>{TodoHelpers.getStateContent({state: 'PROGRESS'})}</Tag> ({todos.filter(todo => todo.state === "PROGRESS" ).length} / {todos.length})</Radio>
                        <Radio key="13" value={TodoHelpers.getPriority({state: "DONE"})}><Tag color={TodoHelpers.getStateColor({state: 'DONE'})}>{TodoHelpers.getStateContent({state: 'DONE'})}</Tag> ({todos.filter(todo => todo.state === "DONE" ).length} / {todos.length})</Radio>
                    </Space>
                </Radio.Group>
            </PageHeader>
            <List
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
