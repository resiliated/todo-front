import React from 'react';

class Todo extends React.Component {

  constructor(props){
    super(props);
    this.handleTodoDeletion = this.handleTodoDeletion.bind(this);
  }

  handleTodoDeletion(){
    this.props.onTodoDeletion(this.props.todo);
  }

  render() {
    return <div className="container todo">
      <h1>{this.props.todo.title}</h1>
      <h2>{this.props.todo.content}</h2>
      <button onClick={this.handleTodoDeletion}>Supprimer</button>
    </div>;
  }
}

export default Todo;
