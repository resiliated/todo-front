import React , { useState, createContext } from 'react';

const TodosContext = createContext();
const CategoriesContext = createContext();
const AuthContext = createContext();

const TodosProvider = (props) => {
    const [todos, setTodos] = useState([]);

    return (
        <TodosContext.Provider value={[todos, setTodos]}>
            {props.children}
        </TodosContext.Provider>
    );
};

const CategoriesProvider = (props) => {
    const [categories, setCategories] = useState([]);

    return (
        <CategoriesContext.Provider value={[categories, setCategories]}>
            {props.children}
        </CategoriesContext.Provider>
    );
}

const AuthProvider = (props) => {
    const [authState, setAuthState] = useState({logged: false});

    return (
        <AuthContext.Provider value={[authState, setAuthState]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {TodosContext, TodosProvider, CategoriesContext, CategoriesProvider, AuthContext, AuthProvider};
