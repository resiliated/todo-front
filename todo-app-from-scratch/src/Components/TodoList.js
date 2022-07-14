import React from 'react';
import Todo from './Todo.js'

class TodoList extends React.Component {

  render() {
    const todos = [];

    this.props.todos.forEach((todo)=>{
      todos.push(<Todo onTodoDeletion={this.props.onTodoDeletion} key={todo.id} todo={todo}/>);
    });

    return <div className="todo-list-container">
      <h1>{this.props.title}</h1>
      <div>{todos}</div>
    </div>;
  }
}

export default TodoList;
