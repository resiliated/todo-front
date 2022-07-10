import React from 'react';
import Todo from './Todo';
import _ from 'lodash';



const TodoList = () => {

  const todos = [
    {
      id: 0,
      description: "aaa",
      title: "bbb"
    },
    {
      id: 1,
      description: "aaa",
      title: "bbb"
    },
    {
      id: 2,
      description: "aaa",
      title: "bbb"
    }
  ];

  return (
  <React.Fragment>
    {!_.isEmpty(todos) ? (
          todos.map((todo) => (
            <Todo key={todo.id} {...todo}  />
          ))
        ) : (
          <p className="message">No todos available. Please add some todos.</p>
    )}
  </React.Fragment>);
};

export default TodoList;
