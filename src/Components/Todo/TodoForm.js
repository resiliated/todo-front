import React, {useState, useEffect} from 'react';
import { Layout, Button, Form, Input, Select } from 'antd';
import APIService from '../../APIService.js'
import '../../App.less';
const { TextArea } = Input;
const { Option } = Select;



export function TodoForm({createTodo, updateTodo, todoToEdit}) {

    const [loaded, setLoaded] = useState(false); //TODO use context loaded
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        if(!loaded){
            //TODO use context categories
            APIService.category.readAll().then(list => {
                setCategories(list);
                setLoaded(true);
            });
        }
    });

    function handleFormValidation(values){
        console.log(values);
        if(todoToEdit === null){
            createTodo({title: values.title, content: values.content, categoryTitle: values.category});
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
          <Form className="formContainer"
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
                label="Catégorie"
                name="category"
                rules={[
                  {
                    required: true,
                    message: 'Sélectionnez une catégorie !',
                  },
                ]}
             >
             <Select
                   defaultValue=""
                 >
                {categories.map((category, index) => (
                  <Option  value={category.title}>
                    {category.title}
                  </Option>
                ))}
             </Select>
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
