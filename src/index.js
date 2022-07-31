import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <App URL_API={"http://54.37.13.50:8081/todo"}/>
  //<App URL_API={"http://localhost:8080/todo"}/>
);
