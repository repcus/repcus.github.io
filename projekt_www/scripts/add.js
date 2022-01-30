const https = require('https')
function addIngredient(prev) {
    addedId = parseInt(prev) + 1
    ingredients = document.getElementById("ingredients")
    row = ingredients.firstElementChild
    col = document.getElementById("ingredient" + prev).parentNode
    col.lastElementChild.remove()

    newCol = document.createElement("div")
    newCol.classList.add("col-8")
    newCol.classList.add("ingredient")

    input1 = document.createElement("input")
    input1.classList.add("form-control")
    input1.classList.add("argument-wide")
    input1.setAttribute("type", "text")
    input1.setAttribute("aria-label", "default input example")
    input1.setAttribute("id", "ingredient" + addedId)

    input2 = document.createElement("input")
    input2.classList.add("form-control")
    input2.classList.add("argument")
    input2.setAttribute("type", "text")
    input2.setAttribute("aria-label", "default input example")
    input2.setAttribute("id", "weight" + addedId)

    newCol.innerHTML += "składnik "
    newCol.appendChild(input1)
    newCol.innerHTML += " waga "
    newCol.appendChild(input2)
    newCol.innerHTML += " g</br>"

    btn = document.createElement("button")
    btn.classList.add("btn")
    btn.classList.add("btn-outline-primary")
    btn.setAttribute("onclick", "addIngredient(" + addedId + ")")
    btn.innerHTML = "Dodaj składnik"

    newCol.appendChild(btn)
    row.appendChild(newCol)
}

function setMode(ele) {
    text = ele.innerHTML
    ele.parentNode.parentNode.parentNode.firstElementChild.innerHTML = text
}

function addStep(stepnum) {
    stepnum = stepnum.id
    stepNumber = parseInt(stepnum) + 1


    row1 = document.createElement("div")
    row1.classList.add("row")
    row1.classList.add("justify-content-center")

    column = document.createElement("div")
    column.classList.add("col-8")

    machine = document.createElement("div")
    machine.classList.add("machine")
    machine.setAttribute("id", "machinestep" + stepNumber)

    h5 = document.createElement("h5")
    h5.innerHTML = "Instrukcja MaszynaKuchenna"

    dropdown = document.createElement("div")
    dropdown.classList.add("dropdown")
    dropdown.setAttribute("style", "display: inline;")

    typeBtn = document.createElement("button")
    typeBtn.classList.add("btn")
    typeBtn.classList.add("btn-secondary")
    typeBtn.classList.add("dropdown-toggle")
    typeBtn.setAttribute("id", "mode" + stepNumber)
    typeBtn.setAttribute("data-bs-toggle", "dropdown")
    typeBtn.setAttribute("aria-expanded", "false")
    typeBtn.innerHTML = "tryb"

    dropdownMenu = document.createElement("ul")
    dropdownMenu.classList.add("dropdown-menu")
    dropdownMenu.setAttribute("aria-labelledby", "mode" + stepNumber)

    dropLi1 = document.createElement("li")
    aDropLi1 = document.createElement("a")
    aDropLi1.setAttribute("onclick", "setMode(this)")
    aDropLi1.classList.add("arg1")
    aDropLi1.classList.add("dropdown-item")
    aDropLi1.innerHTML = "miksowanie"
    dropLi1.appendChild(aDropLi1)

    dropLi2 = document.createElement("li")
    aDropLi2 = document.createElement("a")
    aDropLi2.setAttribute("onclick", "setMode(this)")
    aDropLi2.classList.add("arg2")
    aDropLi2.classList.add("dropdown-item")
    aDropLi2.innerHTML = "podgrzewanie"
    dropLi2.appendChild(aDropLi2)

    dropdownMenu.appendChild(dropLi1)
    dropdownMenu.appendChild(dropLi2)

    form1 = document.createElement("input")
    form1.classList.add("form-control")
    form1.classList.add("argument")
    form1.setAttribute("id", "power" + stepNumber)
    form1.setAttribute("type", "text")
    form1.setAttribute("aria-label", "default input example")

    form2 = document.createElement("input")
    form2.classList.add("form-control")
    form2.classList.add("argument")
    form2.setAttribute("id", "time" + stepNumber)
    form2.setAttribute("type", "text")
    form2.setAttribute("aria-label", "default input example")

    dropdown.appendChild(typeBtn)
    dropdown.appendChild(dropdownMenu)
    t1 = document.createElement("span")
    t1.innerHTML = " moc "
    t2 = document.createElement("span")
    t2.innerHTML = " czas "
    dropdown.appendChild(t1)
    dropdown.appendChild(form1)
    dropdown.appendChild(t2)
    dropdown.appendChild(form2)

    machine.appendChild(h5)
    machine.appendChild(dropdown)

    user = document.createElement("div")
    user.classList.add("user")
    user.setAttribute("id", "userstep" + stepNumber)

    h51 = document.createElement("h5")
    h51.innerHTML = "Instrukcja MaszynaKuchenna"

    title = document.createElement("input")
    title.classList.add("form-control")
    title.classList.add("title")
    title.setAttribute("id", "title" + stepNumber)
    title.setAttribute("aria-label", "default input example")

    t11 = document.createElement("span")
    t11.innerHTML = "Tytuł:"
    t21 = document.createElement("span")
    t21.innerHTML = "Opis:"

    desc = document.createElement("input")
    desc.classList.add("description")
    desc.setAttribute("id", "description" + stepNumber)
    desc.setAttribute("aria-label", "default input example")

    user.appendChild(h51)
    user.appendChild(t11)
    user.appendChild(title)
    user.appendChild(t21)
    user.appendChild(desc)

    column.appendChild(machine)
    column.appendChild(user)

    container = document.createElement("div")
    container.classList.add("container")

    row1.appendChild(column)
    container.appendChild(row1)


    row2 = document.createElement("div")
    row2.classList.add("row")
    row2.classList.add("justify-content-center")
    row2.classList.add("noborder")

    column2 = document.createElement("div")
    column2.classList.add("col-8")

    btnGroup = document.createElement("div")
    btnGroup.classList.add("btn-group")
    btnGroup.setAttribute("role", "group")

    btn1 = document.createElement("button")
    btn1.classList.add("btn")
    btn1.classList.add("btn-outline-primary")
    btn1.setAttribute("onclick", "addStep(document.getElementById(" + stepNumber + "))")
    btn1.innerHTML = "Dodaj krok dla MaszynaKuchenna"

    btn2 = document.createElement("button")
    btn2.classList.add("btn")
    btn2.classList.add("btn-outline-success")
    btn2.setAttribute("id", "changableBtn")
    btn2.setAttribute("onclick", "saveRecipe()")
    btn2.innerHTML = "Zapisz przepis"

    btnGroup.appendChild(btn1)
    btnGroup.appendChild(btn2)

    column2.appendChild(btnGroup)

    row2.appendChild(column2)

    container.appendChild(row2)
    container.setAttribute("id", stepNumber + "")

    document.getElementById("timeline").appendChild(container)

    refreshViev(stepNumber)

    console.log("koniec")
}

function refreshViev(modifyingStepId) {
    console.log("wywołał: " + modifyingStepId)
    timeline = document.getElementById("timeline")
    containers = [].slice.call(document.getElementById("timeline").children)
    for (i = 0; i < containers.length; i++) {
        for (j = 0; j < containers.length - 1; j++) {
            if (parseInt(containers[j].id) > parseInt(containers[j + 1].id)) {
                console.log("swapping " + containers[j].innerText + " " + containers[j + 1].innerText)
                a = containers[j]
                containers[j] = containers[j + 1]
                containers[j + 1] = a
            }
        }
    }

    toDel = timeline.lastElementChild
    while (toDel) {
        console.log("deleted: " + toDel.id)
        timeline.removeChild(toDel)
        toDel = timeline.lastElementChild
    }

    containers.forEach(container => {
        console.log("appended: " + container.id)
        timeline.appendChild(container)
    });

    containers = [].slice.call(document.getElementById("timeline").children)
    i = 1
    containers.forEach(container => {
        container.id = i++
    })

    containers = [].slice.call(document.getElementById("timeline").children)
    for (i = 0; i < containers.length - 1; i++) {
        containers[i].lastElementChild.firstElementChild.firstElementChild.lastElementChild.classList.remove("btn-outline-success")
        containers[i].lastElementChild.firstElementChild.firstElementChild.lastElementChild.classList.add("btn-outline-danger")
        containers[i].lastElementChild.firstElementChild.firstElementChild.lastElementChild.setAttribute("onclick", "deleteStep(" + parseInt(i + 1) + ")")
        containers[i].lastElementChild.firstElementChild.firstElementChild.lastElementChild.innerHTML = "Usuń krok"
    }
}

function deleteStep(stepnum) {
    document.getElementById(stepnum).remove()
    refreshViev(parseInt(stepnum - 1))
}

function saveRecipe() {
    jsonToBe = "{\n"
    containers = [].slice.call(document.getElementsByClassName("container"))
    ingredients = [].slice.call(document.getElementsByClassName("ingredient"))
    //title
    jsonToBe += "\t\"name\": \""
    jsonToBe += document.getElementById("rec-title").value
        //ingredients
    jsonToBe += "\"\n\t\"ingredients\": [\n"
    console.log(ingredients.length)
    for (i = 1; i < ingredients.length + 1; i++) {
        console.log(i)
        jsonToBe += "\t\t{\n\t\t\t\"name\": \"" + document.getElementById("ingredient" + i).value +
            "\",\n\t\t\t\"weight\": " + document.getElementById("weight" + i).value +
            "\n\t\t},\n"
    }
    jsonToBe = jsonToBe.slice(0, -2)
    jsonToBe += "\n\t],\n"
        //human steps
    jsonToBe += "\t\"steps\": [\n"
    containers.forEach(container => {
        jsonToBe += "\t\t{\n\t\t\t\"number\": " +
            container.id + ",\n\t\t\t\"title\": \"" + document.getElementById("title" + container.id).value +
            "\",\n\t\t\t\"description\": \"" + document.getElementById("description" + container.id).value + "\"\n\t\t},\n"
    })
    jsonToBe = jsonToBe.slice(0, -2)
    jsonToBe += "\n\t],\n"
        //machine steps
    jsonToBe += "\n\t\"stepsForMachine\": [\n"
    containers.forEach(container => {
        jsonToBe += "\t\t{\n\t\t\t\"number\": " + container.id + ",\n\t\t\t\"operation\": \"" + document.getElementById("mode" + container.id).innerText + "\",\n\t\t\t\"additionalArguments\": [\n\t\t\t\t{\n" +
            "\t\t\t\t\t\"argumentType\": \"moc\",\n\t\t\t\t\t\"argumentValue\": " + document.getElementById("power" + container.id).value + "\n\t\t\t\t}\n\t\t\t]\n" +
            "\t\t},\n"
    })
    jsonToBe = jsonToBe.slice(0, -2)
    jsonToBe += "\n\t]"
        //end
    jsonToBe += "\n}"
    download('test.json', jsonToBe);
}

function download(filename, data) {
    //tu bedzie post
    xhr = new XMLHttpRequest()
    xhr.open("POST", document.baseURI, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(data)
    //koniec
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}
