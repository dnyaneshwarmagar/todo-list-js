document.getElementById("date").addEventListener("focus", () => {
    let element = document.getElementById("calendar_icon")
    element.style.display = "none";
});

document.getElementById("date").addEventListener("blur", () => {
    let element = document.getElementById("calendar_icon")
    element.style.display = "block";

});

document.getElementById("calendar_icon").addEventListener("click", () => {
    let dateElement = document.getElementById("date");
    dateElement.type = "date";
    dateElement.style.display = "block";
    let element = document.getElementById("calendar_icon")
    element.style.display = "none";

});

document.getElementById("myForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let todoName = document.getElementById("todo_name").value;
    let date = document.getElementById("date").value;
    let priority = document.getElementById("priority_select").value;

    let dataObj = { name: todoName, date, priority, completed: false };
    console.log('dataObj:', dataObj)

    let todosArray = JSON.parse(localStorage.getItem("todoList")) || [];

    todosArray.push(dataObj);

    localStorage.setItem("todoList", JSON.stringify(todosArray));

    document.getElementById("todo_name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("priority_select").value = "";

    renderTodos()
});

function renderTodos() {
    let todosArray = JSON.parse(localStorage.getItem("todoList"));

    let todays_div = document.getElementById("todays_todo_div");
    todays_div.innerHTML = `<p class="todo_heading">Today's TodoList</p>`;
    let future_div = document.getElementById("future_todos_div");
    future_div.innerHTML = `<p class="todo_heading">Future TodoList</p>`;
    let completed_div = document.getElementById("completed_todos_div");
    completed_div.innerHTML = `<p class="todo_heading">Completed TodoList</p>`;

    let today = new Date();
    let todayTodoCount = 1;
    let futureTodoCount = 1;
    let completeTodoCount = 1;
    todosArray?.forEach((todo, index) => {
        let todoDate = new Date(todo.date);

        if (todo.completed === false) {

            if (todoDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
                let todo_div = document.createElement("div");
                todo_div.setAttribute("id", "todo_div")
                todo_div.innerHTML = `
           <div>${todayTodoCount}. ${todo.name}</div>
            <div>${todo.date}</div>
            <div>Priority: ${todo.priority}</div>
            <div>
                <img id="select_img" src="./assets/check-circle.png" alt="img" onclick="handleDone(${index})">
                <img id="trash_img" src="./assets/trash.png" alt="img" onclick="handleDelete(${index})">
            </div>
        `
                todays_div.append(todo_div);
                todayTodoCount++;
            } else {
  
                let todo_div = document.createElement("div");
                todo_div.setAttribute("id", "todo_div");
                if (todoDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
                    todo_div.setAttribute("class", "red_border_class");
                }
                todo_div.innerHTML = `
            <div>${futureTodoCount}. ${todo.name}</div>
            <div>${todo.date}</div>
            <div>Priority: ${todo.priority}</div>
            <div>
                <img id="select_img" src="./assets/check-circle.png" alt="img" onclick="handleDone(${index})">
                <img id="trash_img" src="./assets/trash.png" alt="img" onclick="handleDelete(${index})">
            </div>
        `
                future_div.append(todo_div);
                futureTodoCount++;
            }
        }
        else {
            let completed_todo_div = document.createElement("div");
            completed_todo_div.setAttribute("id", "completed_todo_div")
            completed_todo_div.innerHTML = `
        <div>${completeTodoCount}. ${todo.name}</div>
            <div>${todo.date}</div>
            <div>Priority: ${todo.priority}</div>
            <div>                
                <img id="trash_img" src="./assets/delete_black_icon.png" alt="img" onclick="handleDelete(${index})">
            </div>
        `
            completed_div.append(completed_todo_div);
            completeTodoCount++;
        }
    })
};

renderTodos()

function handleDone(index) {
    let todosArray = JSON.parse(localStorage.getItem("todoList"));
    console.log('todosArray:', todosArray[index])

    todosArray[index].completed = true;
    localStorage.setItem("todoList", JSON.stringify(todosArray));
    renderTodos();
}

function handleDelete(index) {
    let todosArray = JSON.parse(localStorage.getItem("todoList"));
    console.log('todosArray:', todosArray[index])
    let filteredArray = todosArray.filter((todo, ind) => ind !== index)
    console.log('filteredArray:', filteredArray)

    localStorage.setItem("todoList", JSON.stringify(filteredArray));
    renderTodos();
}
