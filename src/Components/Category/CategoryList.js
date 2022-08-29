import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm.js';
import APIService from '../../APIService.js'
import { Layout, List, Divider, Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';



export function CategoryList() {

    const [categories, setCategories] = useState([]);
    const [formVisibility, setFormVisibility] = useState(false);

   const [loaded, setLoaded] = useState(false); //TODO use context loaded

    useEffect(() => {

        if(!loaded){
            readCategory();
        }

    });

    function onCancel(){
        setFormVisibility(false);
    }

    function createCategory(title){
        console.log("Create category: "+ title);
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

    function deleteCategory(category){
        APIService.category.delete(category).then(()=>{
            readCategory();
        });
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
                <List.Item>
                  <Typography.Text mark>[ITEM]</Typography.Text> {category.title}
                  <DeleteOutlined value={category} onClick={() =>{deleteCategory(category)}}/>
                </List.Item>
            )}
        />
    </Layout>
);
}

export default CategoryList;
