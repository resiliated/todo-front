import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const TodoForm = (props) => {
  const [todo, setTodo] = useState({
    title: props.todo ? props.todo.title : '',
    description: props.todo ? props.todo.description : ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const { title, description} = todo;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [title, description];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const todo = {
        id: uuidv4(),
        title,
        description
      };
      props.handleOnSubmit(todo);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        if (value === '') {
          setTodo((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      case 'description':
        if (value === '' ) {
          setTodo((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        setTodo((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="title"
            value={title}
            placeholder="Enter a title"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="description"
            value={description}
            placeholder="Enter a description"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default TodoForm;
