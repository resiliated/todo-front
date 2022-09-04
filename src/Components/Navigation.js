import React, { useState, useEffect, useCallback } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined, PartitionOutlined,UnorderedListOutlined, DiffOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Button } from 'antd';
import TodoHelpers from '../TodoHelpers.js'


export function Navigation({onNav, onLogout}){

    const isConnected = true; //TODO use state context

    let navigate = useNavigate();
    let location = useLocation();
    const getSelectedKey = useCallback(() =>{
        return TodoHelpers.findKeyFromPath(location.pathname);
    }, [location]);
    const [selectedKey, setSelectedKey] = useState(getSelectedKey());
    const [collapsed, setCollapsed] = useState(true);

    function toggleCollapsed() {
        setCollapsed(!collapsed);
    }

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
        },
        {
            "key": "login",
            "icon": isConnected ? <LogoutOutlined /> : <LoginOutlined />,
            "label": isConnected ? "Se déconnecter" :"Se connecter",
            "location": "/"
        }
    ];
    return (
        <nav>
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                  margin: 16,
                }}
                >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                inlineCollapsed={collapsed}
                mode="inline"
                onSelect={onSelect}
                items={items}
                defaultSelectedKeys={["login"]}
                selectedKeys={[selectedKey]}
            />
        </nav>
    )
}

export default Navigation;
