import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { Card} from 'antd';

export function TodoForm(props) {

  let navigate = useNavigate();

  function handleTodoCreation(e){
    e.preventDefault()
    console.log(e);
    props.onTodoCreation(e.target.form[0].value, e.target.form[1].value);
    navigate("/");
  }

  return (
    <Card>
      <Form className="container">
        <Form.Item label="Titre">
          <Input placeholder="Entrez le titre de la todo" />
        </Form.Item>
        <Form.Item label="Contenu">
          <Input rows={4} placeholder="Entrez le contenu de la todo" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleTodoCreation}>Créer</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default TodoForm;
