import React, {useState, useEffect, useContext} from 'react';
import { CategoriesContext } from '../../Context.js';
import { Layout, Button, Form, Input, Select } from 'antd';
import { useSearchParams, useNavigate } from "react-router-dom";
import APIService from '../../APIService.js'
import '../../App.less';
const { TextArea } = Input;
const { Option } = Select;



export function TodoForm() {

    const
    navigate = useNavigate(),
    [categories, setCategories] = useContext(CategoriesContext),
    [todoToEdit, setTodoToEdit] = useState(null),
    [searchParams] = useSearchParams(),
    [form] = Form.useForm();

    useEffect(() => {
        if(categories.length === 0){ //category has never been loaded (never navigate on categoryList...)
            APIService.category.readAll().then(list => {
                setCategories(list);
            });
        }

        var todoId = searchParams.get('todoId')
        if(todoId !== null){
            APIService.todo.read(todoId).then(todo => {
                setTodoToEdit(todo);
                form.setFieldsValue({
                    title: todo.title,
                    category: todo.category.title,
                    content: todo.content
                })
            });
        }

    }, [searchParams, categories, setCategories, form]);

    function handleFormValidation(values){
        if(todoToEdit === null){
            APIService.todo.create({title: values.title, content: values.content, categoryTitle: values.category})
            .then(() => {
                navigate("/list");
            });
        }else{
            todoToEdit.title = values.title;
            todoToEdit.category.id = categories.find(category => category.title === values.category).id;
            todoToEdit.content = values.content;
            APIService.todo.update(todoToEdit)
            .then(() => {
                navigate("/list");
            });
        }

    }

    function onFinishFailed(errorInfo){
        console.error('Failed:', errorInfo);
    }

    return (
        <Layout>
          <Form className="formContainer"
            form={form}
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
                   initialValue= {todoToEdit ? todoToEdit.category.title : null}
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
