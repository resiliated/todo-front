import React, { useState} from 'react';
import { Modal } from 'antd';


export function CategoryForm({visible, onAddCategory, onCancel}) {
    return(
        <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={()=>{
                onAddCategory("lifestyle");
            }}
        >Bonjour</Modal>
    );
}

export default CategoryForm;
