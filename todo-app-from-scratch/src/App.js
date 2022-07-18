import React from 'react';
import TodoList from './Components/TodoList.js';
import TodoForm from './Components/TodoForm.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
          error: null,
          isLoaded: false,
          todos: []
        };
    this.onTodoCreation = this.onTodoCreation.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  componentDidMount() {
      fetch("http://54.37.13.50:8080/todo")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              todos: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

  removeTodo(todoToRemove){
    this.setState({
      todos: this.state.todos.filter(todo =>{
        return todo.id !== todoToRemove.id;
      })
    });
  }

  onTodoCreation(title, content){
    this.setState(prevState => ({
      todos: [...prevState.todos, {id: (new Date()).getTime(),title: title,content: content}]
    }));
  }

  render() {
    return <div>
      <TodoForm onTodoCreation={this.onTodoCreation} />
      <TodoList onTodoDeletion={this.removeTodo} title="Todo liste de Boris" todos={this.state.todos}/>
    </div>
  }
}

export default App;
