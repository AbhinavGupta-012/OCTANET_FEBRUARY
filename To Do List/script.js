const todoInput = document.querySelector(".todoInput");
const todoBtn = document.querySelector(".todoBtn");
const todoList = document.querySelector(".todoList");
const todoFilter = document.querySelector(".todoFilter");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("change", filterTodo);

function addTodo(event){
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todoItem");
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);

    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class = "fas fa-check-circle">li>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class = "fas fa-trash"><li>';
    trashBtn.classList.add("trashBtn");
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    if (item.classList[0] === "trashBtn"){
        const todo = item.parentElement;
        todo.classList.add("slide");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }
    if (item.classList[0] === "completeBtn"){
        const todo = item.parentElement;
        todo.classList.toggle("Completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "All":
                todo.style.display = "flex";
                break;
            case "Completed":
                if (todo.classList.contains("Completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "Incomplete":
                if (!todo.classList.contains("Completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos(){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todoItem");
        todoDiv.appendChild(newTodo);
        
        const completedBtn = document.createElement("button");
        completedBtn.innerHTML = '<i class = "fas fa-check-circle"><li>';
        completedBtn.classList.add("completeBtn");
        todoDiv.appendChild(completedBtn);

        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = '<i class = "fas fa-trash"><li>';
        trashBtn.classList.add("trashBtn");
        todoDiv.appendChild(trashBtn);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}