//selecting element
var incompleteData = document.getElementById("incomplete-data");
var completedData = document.getElementById("completed-data");
var taskToComplete = document.getElementById("task-to-complete");
var completedTask = document.getElementById("completed-task");
var todoInput = document.getElementById("todo-value");
var submitBtn = document.getElementById("submit-btn");
var btnStyle = true;

//creating and adding attribute to button

var button = document.createElement("input");
button.setAttribute("id","submit-button");
button.setAttribute("type","button");
button.setAttribute("value","Add Todo");
button.setAttribute("onClick","onButtonSubmit()");
submitBtn.appendChild(button);

var completedCnt = 0;
var inCompleteCnt = 0;
var editId = '';

function createTodo(value, todoType) {
    var p = document.createElement("p");
    var b = document.createElement("b");
    var outerdiv = document.createElement("div");
    var innerdiv1 = document.createElement("div");
    var innerdiv2 = document.createElement("div");
    var btn1 = document.createElement("button");
    var btn2 = document.createElement("button");
    var btn3 = document.createElement("button");
    btn2.appendChild(document.createTextNode("🖋️"));
    btn3.appendChild(document.createTextNode("🗑️"));
    
    if(todoType=="incomplete-todo") {
        let id = "incomplete-item"+inCompleteCnt+"";
        inCompleteCnt = inCompleteCnt + 1;
        outerdiv.setAttribute("class", "item");
        outerdiv.setAttribute("id", id);
        b.appendChild(document.createTextNode("⏳."));
        innerdiv1.appendChild(b);
        p.appendChild(document.createTextNode(value));
        p.setAttribute("id",id+"-p");
        innerdiv1.appendChild(p);
        outerdiv.appendChild(innerdiv1);
        btn1.appendChild(document.createTextNode("✅️"));
        btn1.setAttribute("onClick", `incompleteToComplete("${id}-p")`);
        btn2.setAttribute("onClick", `editTodo("${id}-p")`);
        btn3.setAttribute("onClick", `deleteTodo("${id}-p")`);
        innerdiv2.appendChild(btn1);
        innerdiv2.appendChild(btn2);
        innerdiv2.appendChild(btn3);
        outerdiv.appendChild(innerdiv2);
        incompleteData.appendChild(outerdiv);
    }else {
        var del = document.createElement("del");
        let id = "completed-item"+completedCnt+"";
        completedCnt = completedCnt + 1;
        outerdiv.setAttribute("class","item");
        outerdiv.setAttribute("id", id);
        b.appendChild(document.createTextNode("⌛."));
        innerdiv1.appendChild(b);
        del.appendChild(document.createTextNode(value));
        p.appendChild(del);
        p.setAttribute("id",id+"-p");
        innerdiv1.appendChild(p);
        outerdiv.appendChild(innerdiv1);
        btn1.appendChild(document.createTextNode("❌️"));
        btn1.setAttribute("onClick", `completeToInComplete("${id}-p")`);
        btn2.setAttribute("onClick", `editTodo("${id}-p")`);
        btn3.setAttribute("onClick", `deleteTodo("${id}-p")`);
        innerdiv2.appendChild(btn1);
        innerdiv2.appendChild(btn2);
        innerdiv2.appendChild(btn3);
        outerdiv.appendChild(innerdiv2);
        completedData.appendChild(outerdiv);
    }
}

function onButtonSubmit() {
    if(btnStyle) {
        button.style.background = "linear-gradient(240deg, rgb(207, 115, 28), transparent)";
        btnStyle = false;
    }else {
        button.style.background = "linear-gradient(100deg, rgb(207, 115, 28), transparent)";
        btnStyle = true;
    }
    if(todoInput.value.length>0){
        if(editId =='c') {
            createTodo(todoInput.value,"completed-todo");
        }else {
            createTodo(todoInput.value,"incomplete-todo");
        }
        todoInput.value="";
        editId = '';
        taskToComplete.style.visibility = "visible";
    }
}

function deleteTodo(id) {
    let node = id.slice(0, id.length-2);
    let elem = document.getElementById(node);
    elem.remove();
}

function incompleteToComplete(id) {
    let node = id.slice(0, id.length-2);
    let elem = document.getElementById(node);
    let para = document.getElementById(id);
    elem.remove();
    createTodo(para.textContent,"completed-todo");
    completedTask.style.visibility = "visible";
}

function completeToInComplete(id) {
    let node = id.slice(0, id.length-2);
    let elem = document.getElementById(node);
    let para = document.getElementById(id);
    elem.remove();
    createTodo(para.textContent,"incomplete-todo");
}

function editTodo(id) {
    if(id[0]=='c') {
        editId = 'c';
    }else {
        editId = '';
    }
    let node = id.slice(0, id.length-2);
    let elem = document.getElementById(node);
    let para = document.getElementById(id);
    elem.remove();
    todoInput.value = para.textContent;
    todoInput.focus();
}

function addTodoAfterKeypress(event) {
    if(todoInput.value.length > 0 && event.keyCode === 13) {
        onButtonSubmit();
    }
}

todoInput.addEventListener("keypress", addTodoAfterKeypress);
