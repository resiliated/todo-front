import React, { useState} from 'react';
import APIService from '../APIService.js'
import { Layout, List, Divider, Typography } from 'antd';

export function CategoryList() {

    const [categories, setCategories] = useState([]);

    function readCategory() {
        APIService.category.readAll().then(list => {
            setCategories(list);
        });
    }

    readCategory();

return (
    <Layout>
        <Divider orientation="left">Tes catégories frère</Divider>
        <List
            bordered
            dataSource={categories}
            renderItem={(category) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {category.title}
            </List.Item>
            )}
        />
    </Layout>
);
}

export default CategoryList;
