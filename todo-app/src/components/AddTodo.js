import React from 'react';
import TodoForm from './TodoForm';

const AddTodo = () => {
  const handleOnSubmit = (todo) => {
    console.log(todo);
  };

  return (
    <React.Fragment>
      <TodoForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddTodo;
