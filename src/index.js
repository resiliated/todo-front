import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TodosProvider, CategoriesProvider, AuthProvider } from './Context.js';
import './index.css';
import App from './App.js';

const
container = document.getElementById('root'),
root = createRoot(container);

root.render(
    <BrowserRouter>
        <TodosProvider>
        <CategoriesProvider>
        <AuthProvider>
            <App/>
        </AuthProvider>
        </CategoriesProvider>
        </TodosProvider>
    </BrowserRouter>
);
