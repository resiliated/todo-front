import React, { useState} from 'react';
import { Modal, Form, Input } from 'antd';


export function CategoryForm({visible, onAddCategory, onCancel}) {

    const
    [title, setTitle] = useState(""),
    handleChange = (event) => {
        const value = event.target.value;
        console.log(value);
        setTitle(value);
    };

    return(
        <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={(e)=>{
            onAddCategory(title);
            setTitle("");
            console.log("kUDSHFk<ze: " + title);
        }}
        >
            <Form className="formContainer"
            >
                <Form.Item
                 label="Titre de la catégoris"
                 name="title"
                 rules={[
                   {
                     required: true,
                     message: 'Entrez un titre !',
                   },
                 ]}
                >
                <Input allowClear={true} placeholder="Entrez le titre de la catégorie" value={title}  onChange={handleChange}/>
            </Form.Item>
        </Form>
        </Modal>
    );
}

export default CategoryForm;
