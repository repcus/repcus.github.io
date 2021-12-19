function setMode(ele){
    text = ele.innerHTML
    ele.parentNode.parentNode.parentNode.firstElementChild.innerHTML = text
}

function addStep(){
    row1 = document.createElement("div")
    row1.classList.add("row justify-content-center")

    column = document.createElement("div")
    column.classList.add("col-8")

    machine = document.createElement("div")
    machine.classList.add("machine")
    machine.setAttribute("id", "machine")
    
    row2 = document.createElement("div")
    row2.classList.add("row justify-content-center noborder")
    
    container = document.createElement("div")
    container.classList.add("container")
    
    container.appendChild(row1)
    document.getElementById("timeline").appendChild(container)
}