import React from 'react';

export function TodoForm(props) {

  function handleTodoCreation(e){
    e.preventDefault()
    props.onTodoCreation(e.target.form[0].value, e.target.form[1].value);
  }

  function handleTitleChange(e){
  }

  function handleContentChange(e){
  }

  return (<form className="container">
    <label>Titre :</label>
    <input type="text" name="Titre" onChange={handleTitleChange} value={props.title} />
    <label>Contenu :</label>
    <textarea type="text" name="Contenu" onChange={handleContentChange} value={props.content} />
    <input onClick={handleTodoCreation} type="submit" value="Créer" />
  </form>);

}

export default TodoForm;
