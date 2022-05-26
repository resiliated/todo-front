import React, { useState, useEffect, useCallback, useContext } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined, PartitionOutlined,UnorderedListOutlined, DiffOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Button } from 'antd';
import TodoHelpers from '../TodoHelpers.js'
import { AuthContext } from '../Context.js';


export function Navigation(){

    const
    [authState, setAuthState] = useContext(AuthContext),
    navigate = useNavigate(),
    location = useLocation(),
    getSelectedKey = useCallback(() =>{
        return TodoHelpers.findKeyFromPath(location.pathname);
    }, [location]),
    [selectedKey, setSelectedKey] = useState(getSelectedKey()),
    [collapsed, setCollapsed] = useState(true);

    function toggleCollapsed() {
        setCollapsed(!collapsed);
    }

    useEffect(() => {
        setSelectedKey(getSelectedKey(location));
    }, [setSelectedKey, getSelectedKey, location]);


    function onSelect(e){
        if(authState.logged && TodoHelpers.findKeyFromPath(e.item.props.location) === "login"){
            setAuthState({logged: false});
        }
        navigate(e.item.props.location);
    }

    const items = [

        {
            "key": "list",
            "icon": <UnorderedListOutlined />,
            "label": "Todos",
            "location": "/list",
            "disabled": !authState.logged
        },
        {
            "key": "category",
            "icon": <PartitionOutlined />,
            "label": "Categories",
            "location": "/category",
            "disabled": !authState.logged
        },
        {
            "key": "add",
            "icon": <DiffOutlined />,
            "label": "Ajouter une todo",
            "location": "/add",
            "disabled": !authState.logged
        },
        {
            "key": "login",
            "icon": authState.logged ? <LogoutOutlined /> : <LoginOutlined />,
            "label": authState.logged ? "Se déconnecter" :"Se connecter",
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
