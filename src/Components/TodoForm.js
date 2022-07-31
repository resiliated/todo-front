import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { Card} from 'antd';
import '../App.less';

const { TextArea } = Input;


export function TodoForm({onTodoCreation, onTodoEdition}) {

  let navigate = useNavigate();
  let location = useLocation();

  let [todo, setTodo] = useState(location.state);

  useEffect(() => {
       setTodo(location.state);
    }, [location, setTodo]);

  function handleTodoCreation(values){
    if(todo === null){
        onTodoCreation(values.title, values.content);
    }else{
        todo.title = values.title;
        todo.content = values.content;
        onTodoEdition(todo);
    }

    navigate("/");
  }

  function onFinishFailed(errorInfo){
    console.error('Failed:', errorInfo);
  }

  return (
    <Card>
      <Form className="container"
        onFinish={handleTodoCreation}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
            label="Titre"
            name="title"
            initialValue= {todo ? todo.title : null}
            rules={[
              {
                required: true,
                message: 'Entrez un titre !',
              },
            ]}
        >
          <Input placeholder="Entrez le titre de la todo" />
        </Form.Item>
        <Form.Item
            label="Contenu"
            name="content"
            initialValue={todo ? todo.content : null}
        >
          <TextArea rows={6} placeholder="Entrez le contenu de la todo" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">{todo ? "Editer" : "Créer"}</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default TodoForm;
