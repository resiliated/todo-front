import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { UnorderedListOutlined, DiffOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";


export function Header(){

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
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

export default Header;
