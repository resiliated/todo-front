const TodoHelpers = {
    getPriority: function (todo){
        var value;

        switch (todo.status) {
          case 0:
            value = 0;
            break;
          case 1:
            value = 1;
            break;
          case 2:
            value = 2;
            break;
          default:
            value = -1;
            break;
        }
        return value;
    },

    setNextState: function(todo){
      switch (todo.status) {
        case 0:
          todo.status = 1;
          break;
        case 1:
          todo.status = 2;
          break;
        case 2:
          todo.status = 0;
          break;
        default:
          break;
      }
      return todo;
    },

    getStateColor: function(todo){
      var color;
      switch (todo.status) {
        case 0:
          color = "red";
          break;
        case 1:
          color = "volcano";
          break;
        case 2:
          color = "green";
          break;
        default:
          break;
      }
      return color;
    },

    getStateContent: function(todo){
        var content;
        switch (todo.status) {
            case 0:
                content = "A faire";
                break;
            case 1:
                content = "En cours";
                break;
            case 2:
                content = "Fait";
                break;
            default:
                break;
        }
        return content;
    },

    findKeyFromPath: function(path){
        var selectedKey;
        switch(path){
            case "/":
            selectedKey = "login";
            break;

            case "/list":
            selectedKey = "list";
            break;

            case "/category":
            selectedKey = "category";
            break;

            case "/add":
            selectedKey = "add";
            break;

            default:
            break;
        }
        return selectedKey;
    }
}

export default TodoHelpers;