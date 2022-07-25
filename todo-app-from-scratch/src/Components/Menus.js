import React, { useEffect } from 'react';
import { UnorderedListOutlined, DiffOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from 'antd';

export function Menus(){

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
      //TODO
     console.log(location)
  }, [location]);

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
    <Menu onSelect={onSelect} mode="horizontal" items={items} defaultSelectedKeys={["list"]}/>
  )
}

export default Menus;
