// todo içindeki veriyi çekme işlemi
const todoInput = document.querySelector(".todo-input");
// inputun yanındaki + butonu verisi
const todoButton = document.querySelector(".todo-button");
// filtreleme butonu
const todoFilter = document.querySelector(".filter-todo")
// ykardaki verileri alıp  aşağı değere atanacak kısım
const todoList = document.querySelector(".todo-list");
// uyarı listeleri
const alertWarning = document.querySelector(".alert-warning");
const alertSuccsess = document.querySelector(".alert-success");



// tıklayınca yapılacak işlemler olay izleyicileri
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterTodo)


document.addEventListener("DOMContentLoaded", function(){
    getTodos()
})
// fonsiyonları 
function addTodo(e) {
    e.preventDefault();
    const isEmpty = str => !str.trim().length;
    if (isEmpty(todoInput.value)) {
        alertWarning.style.display = "block";
        setTimeout(() => {
            alertWarning.style.display="none"
        }, 1500);


         // tıklanmadan sonra inputu temizle
         todoInput.value = "";
    } else {
        alertSuccsess.style.display = "block";
        setTimeout(() => {
            alertSuccsess.style.display = "none";
        }, 1500);

        saveLocalTodos(todoInput.value)
        // todo div oluşturma
        const todoDIv = document.createElement("div");
        todoDIv.classList.add("todo");
        // onay butonu ekleme kısmı

        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
        completedButton.classList.add("complete-btn");
        todoDIv.appendChild(completedButton);

        // yazınlan veriyi ekleme kısmındaki li oluşturma kısmı
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDIv.appendChild(newTodo);


        // silme butonu verisi alma işlemi

        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fa fa-minus-circle'></i>";
        trashButton.classList.add("trash-btn");
        todoDIv.appendChild(trashButton);

        // yazılan değeri ekrana atama
        todoList.appendChild(todoDIv);

         // tıklanmadan sonra inputu temizle
         todoInput.value = "";
       
    }

}
// üstünü çiz ve silme fonksiyonu bölümü
function deleteCheck(e) {
    const item = e.target;
    
    // silme fonksiyonu
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalStorage(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
        
    }
    // onay üstü çiz kısmı
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }


}
// üstü çizili çizgisiz ve hepsini gibi todoları ekran getirme fonksiyonu
function filterTodo(e) {
    const todos = Array.from(todoList.children);  // `children` kullanarak yalnızca element düğümleri alıyoruz
    todos.forEach(function(item) {
        switch (e.target.value) {
            case "all":
                item.style.display = "flex";
                break;
            case "completed":
                if (item.classList.contains("completed")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!item.classList.contains("completed")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    let todos;

    if(localStorage.getItem("todos")=== null){
        todos= [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos))
}

function getTodos() {
    let todos = localStorage.getItem("todos") === null ? [] : JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fa fa-minus-circle'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}


function removeLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos= [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[1].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

