import React from 'react';
import { Layout, Button, Form, Input } from 'antd';
import '../App.less';
const { TextArea } = Input;


export function TodoForm({createTodo, updateTodo, todoToEdit}) {

    function handleFormValidation(values){
        if(todoToEdit === null){
            createTodo({title: values.title, content: values.content});
        }else{
            todoToEdit.title = values.title;
            todoToEdit.content = values.content;
            updateTodo(todoToEdit);
        }
    }

    function onFinishFailed(errorInfo){
        console.error('Failed:', errorInfo);
    }

    return (
        <Layout>
          <Form className="container"
            onFinish={handleFormValidation}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
                label="Titre"
                name="title"
                initialValue= {todoToEdit ? todoToEdit.title : null}
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
                initialValue={todoToEdit ? todoToEdit.content : null}
            >
              <TextArea rows={6} placeholder="Entrez le contenu de la todo" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">{todoToEdit ? "Editer" : "Créer"}</Button>
            </Form.Item>
          </Form>
        </Layout>
    );
}

export default TodoForm;
