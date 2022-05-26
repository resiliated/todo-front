const
DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
},
BASE_URL = "http://localhost:8080",
TODO_API = "/todo",
CATEGORY_API = "/category",
LOGIN_API = "/users/login";

function computeUrl(endpoint){ //TODO
    return BASE_URL + endpoint;
}

const APIService = {
    /*** TODO OPERATIONS ***/
    todo: {
        create: function(todoToCreate) {
            return fetch(computeUrl(TODO_API), {
                method: 'POST',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(todoToCreate)
            }).then(res => res.json());
        },

        read: function(todoId){
            return fetch(computeUrl(TODO_API) + "/" + todoId, {
                method: 'GET',
                headers: DEFAULT_HEADERS
            }).then(res => res.json());
        },

        readAll: function(categoryId) {
            var URL = computeUrl(TODO_API);
            if(categoryId != null){
                URL = computeUrl(CATEGORY_API) + "/" + categoryId + TODO_API;
            }

            return fetch(URL , {
                method: 'GET',
                headers: DEFAULT_HEADERS
            }).then(res => res.json());
        },

        update: function(todoToUpdate){
            return fetch(computeUrl(TODO_API) + "/" + todoToUpdate.id, {
                method: 'PATCH',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(todoToUpdate)
            }).then(res => res.json());
        },

        delete: function(todoToDelete){
            return fetch(computeUrl(TODO_API)+"/"+todoToDelete.id, {
                method: 'DELETE',
                headers: DEFAULT_HEADERS
            }).then();
        },
    },

    /*** CATEGORY OPERATIONS ***/
    category: {
        create: function(category){
            return fetch(computeUrl(CATEGORY_API), {
                method: 'POST',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(category)
            }).then(res => res.json());
        },
        readAll: function() {
            return fetch(computeUrl(CATEGORY_API), {
                method: 'GET',
                headers: DEFAULT_HEADERS
            }).then(res => res.json());
        },
        delete: function(category){
            return fetch(computeUrl(CATEGORY_API)+"/"+category.id, {
                method: 'DELETE',
                headers: DEFAULT_HEADERS
            }).then();
        }
    },

    /*** LOGIN OPERATIONS ***/
    login: function(username, password){
        DEFAULT_HEADERS['Authorization'] = 'Basic ' + window.btoa(username+':'+password);
        return fetch(computeUrl(LOGIN_API), {
            method: 'GET',
            headers: DEFAULT_HEADERS
        });
    }
};

export default APIService;