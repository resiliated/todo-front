const
DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
},
BASE_URL = "http://localhost:8080",
TODO_API = BASE_URL + "/api",
LOGIN_API = TODO_API + "/users/login";

const APIService = {
    /*** CRUD OPERATIONS ***/
    create: function(todoToCreate) {
        return fetch(TODO_API, {
            method: 'POST',
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(todoToCreate)
        }).then(res => res.json());
    },

    readAll: function() {
        return fetch(TODO_API, {
            method: 'GET',
            headers: DEFAULT_HEADERS
        }).then(res => res.json());
    },

    update: function(todoToUpdate){
        return fetch(TODO_API + "/" + todoToUpdate.id, {
            method: 'PATCH',
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(todoToUpdate)
        }).then(res => res.json());
    },

    delete: function(todoToDelete){
        return fetch(TODO_API+"/"+todoToDelete.id, {
            method: 'DELETE',
            headers: DEFAULT_HEADERS
        }).then();
    },

    /*** LOGIN OPERATIONS ***/
    login: function(username, password){
        DEFAULT_HEADERS['Authorization'] = 'Basic ' + window.btoa(username+':'+password);
        return fetch(LOGIN_API, {
            method: 'GET',
            headers: DEFAULT_HEADERS
        }).then(res => res.json());
    }
};

export default APIService;