let tasklist=[]
if (localStorage.getItem('task') !=null && localStorage.getItem('task') !=""){
    tasklist=localStorage.getItem('task').split(",")
}
else{
    localStorage.setItem('task',"")
}
let taskContiner=document.getElementById("all-task-continer")
function addtastlist(list){
    taskContiner.innerHTML=""
    list.forEach((element,index)=> {
        taskContiner.innerHTML+=`
        <section key=${index} class="task-continer">
            <input type="text" key=${index} value=${element} disabled>
            <button class="edit-btn" onclick="edit(event)">Edit</button>
            <button class="delete-btn" onclick="Delete(event)">Delete</button>
        </section>`
    });
   
}

addtastlist(tasklist)
    
let addBtn=document.querySelector("button.add-btn");
let taskInput=document.querySelector("div.add-title>input")
addBtn.addEventListener("click",()=>{
    if (taskInput.value !=""){
        tasklist.push(taskInput.value)
        taskInput.value=""
        localStorage["task"]=tasklist.toString()
        addtastlist(tasklist)
    }
    else{
        alert("please type task name")
    }
})

function Delete(event){
    taskname=event.target.previousElementSibling.previousElementSibling.value
    tasklist = tasklist.filter((item)=>item !== taskname)
    event.target.parentNode.remove()
    localStorage["task"]=tasklist.toString()
}

var oldtaskname
function edit(event){
    event.target.previousElementSibling.disabled = false
    oldtaskname=event.target.previousElementSibling.value;
    btn=document.createElement("button")
    btn.innerHTML="confirm"
    btn.className+="confirm-btn"
    btn.setAttribute("onclick", "confirm(event)")
    event.target.insertAdjacentElement('beforebegin', btn)
    event.target.remove()
}

function confirm(event){
    event.target.previousElementSibling.disabled = true
    let newtaskname=event.target.previousElementSibling.value
    localStorage["task"]=tasklist.toString().replace(oldtaskname,newtaskname)
    tasklist=localStorage.getItem('task').split(",")
    btn=document.createElement("button")
    btn.innerHTML="edit"
    btn.className+="edit-btn"
    btn.setAttribute("onclick", "edit(event)")
    event.target.insertAdjacentElement('beforebegin', btn)
    event.target.remove()
}
