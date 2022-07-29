import React, { useState, useEffect } from 'react';
import { Radio, PageHeader, Space, List } from 'antd';
import Todo from './Todo.js'
import TodoHelpers from '../TodoHelpers.js'

export function TodoList(props) {

    const [value, setValue] = useState(TodoHelpers.getPriority({state: "ALL"}));

    useEffect(() => {
        props.todos.sort(function(a, b) {
            return TodoHelpers.getPriority(a) - TodoHelpers.getPriority(b);
        });
    }, [props.todos]);

    function onChange(e){
        setValue(e.target.value);
    }

    return(
        <div>
            <PageHeader
              title="Status todo"
              subTitle=""
              className="site-page-header"

            >
                <Radio.Group key="1" onChange={onChange} value={value}>
                    <Space direction="vertical">
                        <Radio key="10" value={TodoHelpers.getPriority({state: "ALL"})}>Tout ({props.todos.length})</Radio>
                        <Radio key="11" value={TodoHelpers.getPriority({state: "TODO"})}>A faire ({props.todos.filter(todo => todo.state === "TODO" ).length} / {props.todos.length})</Radio>
                        <Radio key="12" value={TodoHelpers.getPriority({state: "PROGRESS"})}>En cours ({props.todos.filter(todo => todo.state === "PROGRESS" ).length} / {props.todos.length})</Radio>
                        <Radio key="13" value={TodoHelpers.getPriority({state: "DONE"})}>Fait ({props.todos.filter(todo => todo.state === "DONE" ).length} / {props.todos.length})</Radio>
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
                dataSource={props.todos.filter(todo => TodoHelpers.getPriority(todo) === value || value === TodoHelpers.getPriority({state: todo}))}
                    renderItem={(todo) => (
                        <List.Item>
                            <Todo onTodoDeletion={props.onTodoDeletion} onNextState={props.onNextState} onReset={props.onReset} key={todo.id} todo={todo}/>
                        </List.Item>
                     )}
                />

        </div>
    );
}

export default TodoList;
