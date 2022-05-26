import React, { Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import './App.less';
import Navigation from './Components/Navigation.js';
const { Content, Footer } = Layout;
const Login = React.lazy(() => import('./Components/Login.js'));
const CategoryList = React.lazy(() => import('./Components/Category/CategoryList.js'));
const TodoList = React.lazy(() => import('./Components/Todo/TodoList.js'));
const TodoForm = React.lazy(() => import('./Components/Todo/TodoForm.js'));


export function App() {

    return (
        <Spin spinning={false} tip="chargement...">
            <Layout>
               <Navigation />
                <Content>
                    <Routes>
                        <Route path="/" element={<Suspense fallback={<>...</>}> <Login /> </Suspense>} />
                        <Route path="/list" element={<Suspense fallback={<>...</>}><TodoList title="Todo liste de Boris" /></Suspense>} />
                        <Route path="/category" element={<Suspense fallback={<>...</>}><CategoryList /></Suspense>} />
                        <Route path="/add" element={<Suspense fallback={<>...</>}><TodoForm /></Suspense>} />
                    </Routes>
                    <Footer>
                        <small>Boris Design ©2022 Created by me</small>
                    </Footer>
                </Content>
            </Layout>
        </Spin>
    );
}

export default App;
