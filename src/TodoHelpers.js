const TodoHelpers = {
    getPriority: function (todo){
        var value = -1;

        switch (todo.state) {
          case "TODO":
            value = 0;
            break;
          case "PROGRESS":
            value = 1;
            break;
          case "DONE":
            value = 2;
            break;
          default:
            break;
        }
        return value;
    },

    setNextState: function(todo){
      switch (todo.state) {
        case "TODO":
          todo.state = "PROGRESS";
          break;
        case "PROGRESS":
          todo.state = "DONE";
          break;
        case "DONE":
          todo.state = "TODO";
          break;
        default:
          break;
      }
      return todo;
    },

    getStateColor: function(todo){
      var color;
      switch (todo.state) {
        case "TODO":
          color = "red";
          break;
        case "PROGRESS":
          color = "volcano";
          break;
        case "DONE":
          color = "green";
          break;
        default:
          break;
      }
      return color;
    },

    getStateContent: function(todo){
        var content;
        switch (todo.state) {
            case "TODO":
                content = "A faire";
                break;
            case "PROGRESS":
                content = "En cours";
                break;
            case "DONE":
                content = "Fait";
                break;
            default:
                break;
        }
        return content;
    }
}

export default TodoHelpers;