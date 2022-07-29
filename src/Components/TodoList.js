import React, { useState, useEffect } from 'react';
import { Radio, PageHeader } from 'antd';
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
              extra = {[
                <Radio.Group key="1" onChange={onChange} value={value}>
                    <Radio key="10" value={TodoHelpers.getPriority({state: "ALL"})}>Tout</Radio>
                    <Radio key="11" value={TodoHelpers.getPriority({state: "TODO"})}>A faire</Radio>
                    <Radio key="12" value={TodoHelpers.getPriority({state: "PROGRESS"})}>En cours</Radio>
                    <Radio key="13" value={TodoHelpers.getPriority({state: "DONE"})}>Fait</Radio>
                </Radio.Group>
              ]}
            >
            </PageHeader>
            <div>
                {props.todos.filter(todo => TodoHelpers.getPriority(todo) === value || value === TodoHelpers.getPriority({state: todo})).map(todo => (
                    <Todo onTodoDeletion={props.onTodoDeletion} onNextState={props.onNextState} onReset={props.onReset} key={todo.id} todo={todo}/>
                ))}
            </div>
        </div>
    );
}

export default TodoList;
