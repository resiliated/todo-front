import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm.js';
import APIService from '../../APIService.js'
import { Layout, List, Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';



export function CategoryList() {

   const
   [categories, setCategories] = useState([]),
   [formVisibility, setFormVisibility] = useState(false),
   [loaded, setLoaded] = useState(false); //TODO use context loaded

   let navigate = useNavigate(); //TODO use context

    useEffect(() => {
        if(!loaded){
            readCategory();
        }
    });

    function onCancel(){
        setFormVisibility(false);
    }

    function createCategory(title){
        APIService.category.create({title: title}).then(category => {
            readCategory();
            setFormVisibility(false);
        });
    }

    function readCategory() {
        APIService.category.readAll().then(list => {
            setCategories(list);
            setLoaded(true);
        });
    }

    function onCategoryDelete(e, category){
        e.preventDefault();
        APIService.category.delete(category).then(()=>{
            readCategory();
        });
    }

    function onCategorySelect(e, category){
        e.preventDefault();
        navigate("/list?categoryId=" + category.id);
    }

return (
    <Layout>
        <Button
            type="primary"
            onClick={() => {
              setFormVisibility(true);
            }}
        >
        Ajouter catégorie
        </Button>
        <CategoryForm visible={formVisibility} onAddCategory={createCategory} onCancel={onCancel}/>
        <List
            bordered
            dataSource={categories}
            renderItem={(category) => (
                <List.Item
                    actions={[<a href="/" onClick={(e) => onCategoryDelete(e, category)} >Supprimer</a>,<a href="/" onClick={(e) => onCategorySelect(e, category)} >Ouvrir la liste</a>]}
                >
                  <Typography.Text mark>{category.title}</Typography.Text>

                </List.Item>
            )}
        />
    </Layout>
);
}

export default CategoryList;
