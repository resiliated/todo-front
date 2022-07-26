import React, { useState, useEffect, useCallback } from 'react';
import { UnorderedListOutlined, DiffOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from 'antd';

export function Menus(){

  let navigate = useNavigate();
  let location = useLocation();
  const getSelectedKey = useCallback(() =>{
      return location.pathname === "/" ? "list" : "add";
    }, [location]);
  const [selectedKey, setSelectedKey] = useState(getSelectedKey())

  useEffect(() => {
     setSelectedKey(getSelectedKey());
  }, [setSelectedKey, getSelectedKey]);

  function onSelect(e){
    navigate(e.item.props.location);
  }

  const items = [
    {
      "key": "list",
      "icon": <UnorderedListOutlined />,
      "label": "Liste des todos",
      "location": "/"
    },
    {
      "key": "add",
      "icon": <DiffOutlined />,
      "label": "Ajouter une todo",
      "location": "/add"
    }
  ];
  return (
    <Menu onSelect={onSelect} mode="horizontal" items={items} defaultSelectedKeys={["list"]} selectedKeys={[selectedKey]}/>
  )
}

export default Menus;
