import React from 'react';
import { NavLink } from 'react-router-dom';

export function Header(){
  return (
    <header>
      <h1>Todo list App</h1>
      <hr />
      <div>
        <NavLink to="/">
          Liste de todos
        </NavLink>
        <NavLink to="/add">
          Ajouter une todo
        </NavLink>
      </div>
    </header>
  )
}

export default Header;

