import React, { useState, useEffect, useCallback } from 'react';
import { UnorderedListOutlined, DiffOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from 'antd';

export function Menus({authorized}){

    let navigate = useNavigate();
    let location = useLocation();
    const getSelectedKey = useCallback(() =>{
        var selectedKey;
        switch(location.pathname){
            case "/":
            selectedKey = "login";
            break;

            case "/list":
            selectedKey = "list";
            break;

            case "/add":
            selectedKey = "add";
            break;

            default:
            break;
        }
        return selectedKey;
    }, [location]);
    const [selectedKey, setSelectedKey] = useState(getSelectedKey());

    useEffect(() => {
        setSelectedKey(getSelectedKey());
    }, [setSelectedKey, getSelectedKey]);

    function onSelect(e){
        navigate(e.item.props.location);
    }

    const items = [
        {
            "key": "login",
            "icon": <LoginOutlined />,
            "label": "Login",
            "location": "/"
        },
        {
            "key": "list",
            "icon": <UnorderedListOutlined />,
            "label": "Liste des todos",
            "location": "/list",
            "disabled": !authorized
        },
        {
            "key": "add",
            "icon": <DiffOutlined />,
            "label": "Ajouter une todo",
            "location": "/add",
            "disabled": !authorized
        }
    ];
    return (
        <Menu onSelect={onSelect} items={items} defaultSelectedKeys={["login"]} selectedKeys={[selectedKey]}/>
    )
}

export default Menus;
