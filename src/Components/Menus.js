import React, { useState, useEffect, useCallback } from 'react';
import { PartitionOutlined,UnorderedListOutlined, DiffOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from 'antd';
import TodoHelpers from '../TodoHelpers.js'


export function Menus({isConnected, onNav, onLogout}){

    let navigate = useNavigate();
    let location = useLocation();
    const getSelectedKey = useCallback(() =>{
        return TodoHelpers.findKeyFromPath(location.pathname);
    }, [location]);
    const [selectedKey, setSelectedKey] = useState(getSelectedKey());

    useEffect(() => {
        setSelectedKey(getSelectedKey(location));
    }, [setSelectedKey, getSelectedKey, location]);


    function onSelect(e){
        onNav();
        if(isConnected && TodoHelpers.findKeyFromPath(e.item.props.location) === "login"){
            onLogout();
        }
        navigate(e.item.props.location);
    }

    const items = [
        {
            "key": "login",
            "icon": isConnected ? <LogoutOutlined /> : <LoginOutlined />,
            "label": isConnected ? "Se déconnecter" :"Se connecter",
            "location": "/"
        },
        {
            "key": "list",
            "icon": <UnorderedListOutlined />,
            "label": "Todos",
            "location": "/list",
            "disabled": !isConnected
        },
        {
            "key": "category",
            "icon": <PartitionOutlined />,
            "label": "Categories",
            "location": "/category",
            "disabled": !isConnected
        },
        {
            "key": "add",
            "icon": <DiffOutlined />,
            "label": "Ajouter une todo",
            "location": "/add",
            "disabled": !isConnected
        }
    ];
    return (
        <Menu onSelect={onSelect} items={items} defaultSelectedKeys={["login"]} selectedKeys={[selectedKey]}/>
    )
}

export default Menus;
