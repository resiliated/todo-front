import React from 'react';

class TodoForm extends React.Component {

  constructor(props){
    super(props);
    this.handleTodoCreation = this.handleTodoCreation.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleTodoCreation(e){
    e.preventDefault()
    this.props.onTodoCreation(e.target.form[0].value, e.target.form[1].value);
  }

  handleTitleChange(e){
  }

  handleContentChange(e){
  }

  render() {
    return <form className="container">
      <label>Titre :</label>
      <input type="text" name="Titre" onChange={this.handleTitleChange} value={this.props.title} />
      <label>Contenu :</label>
      <textarea type="text" name="Contenu" onChange={this.handleContentChange} value={this.props.content} />
      <input onClick={this.handleTodoCreation} type="submit" value="Créer" />
    </form>;
  }
}

export default TodoForm;
