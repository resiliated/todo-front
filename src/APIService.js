var
BASE_URL = "http://localhost:8080",
TODO_API = BASE_URL + "/todo",
LOGIN_API = BASE_URL + "/login";

const APIService = {
    /*** CRUD OPERATIONS ***/
    create: function(todoToCreate) {
        return fetch(TODO_API, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoToCreate)
        }).then(res => res.json());
    },

    readAll: function(userId) {
        return fetch(TODO_API+"/user/"+userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json());
    },

    update: function(todoToUpdate){
        return fetch(TODO_API, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoToUpdate)
        }).then(res => res.json());
    },

    delete: function(todoToDelete){
        return fetch(TODO_API+"/"+todoToDelete.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json());
    },

    /*** LOGIN OPERATIONS ***/
    login: function(username, password){
        return fetch(LOGIN_API, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: username, password: password})
        }).then(res => res.json());
    }
};

export default APIService;