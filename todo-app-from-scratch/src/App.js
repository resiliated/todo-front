import React from 'react';
import TodoList from './Components/TodoList.js';
import TodoForm from './Components/TodoForm.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {todos: [{'id': 0, 'title': "Première todo", 'content': "Contenu de la todo"},
                          {'id': 1, 'title': "Deuxième todo", 'content': "Contenu de la todo"},
                          {'id': 2, 'title': "Toisième todo", 'content': "Contenu de la todo"},
                          {'id': 3, 'title': "Quatrième todo", 'content': "Contenu de la todo"}
                          ]};
    this.onTodoCreation = this.onTodoCreation.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
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
