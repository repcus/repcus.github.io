async function readJSON() {
    var req = new XMLHttpRequest()
    req.open('GET', 'http://localhost:3000/users', false)
    req.send(null)
    if(req.status == 200)
        createDropdown(req.responseText)
    
    // const requestURL = 'https://raw.githubusercontent.com/repcus/repcus.github.io/main/projekt_www/resources/test.json';
    // const request = new Request(requestURL);

    // const response = await fetch(request);
    // const test = await response.text();

    // const testJson = JSON.parse(test);
    //create(testJson)
}
function createDropdown(names){
    base = document.getElementById("dropdownAdd")
    names = JSON.parse(names)
    for(i = 0; i < names.length; i++){
        li = document.createElement("li")
        a = document.createElement("a")
        a.setAttribute("onclick", "getRecipeByName(\"" + names[i].name + "\")")
        a.classList.add("dropdown-item")
        a.innerText = names[i].name
        li.appendChild(a)
        base.appendChild(li)
    }
}

async function getRecipeByName(name){
    console.log(name)
    document.getElementById("executionCarousel").classList.remove("hidden")
    var req = new XMLHttpRequest()
    url = 'http://localhost:3000/makieta_read.html/' + name
    req.open('GET', url, false)
    req.send(null)
    if(req.status == 200){
        create(req.responseText)
    }
}

function create(json) {
    execCar = document.getElementById("executionCarousel")
    hide = document.getElementById("mode1")
    hide.classList.add("hidden")
    execCar.classList.remove("hidden")
    inner = document.getElementById("car-inner")


    for (i in Object.keys(json.stepsForMachine)) {
        modalwindow = document.createElement("div")
        modalwindow.classList.add("carousel-item")


        content = document.createElement("div")
        content.classList.add("slide-content")

        row1 = document.createElement("div")
        row1.classList.add("row")

        col5 = document.createElement("div")
        col5.classList.add("col-5")

        col7 = document.createElement("div")
        col7.classList.add("col-7")

        col12 = document.createElement("div")
        col12.classList.add("col-12")

        title = document.createElement("h1")

        desc = document.createElement("div")

        row2 = document.createElement("div")
        row2.classList.add("row")

        nextBtn = document.createElement("button")
        nextBtn.setAttribute("type", "button")
        nextBtn.setAttribute("data-bs-target", "#executionCarousel")
        nextBtn.setAttribute("data-bs-slide", "next")
        nextBtn.innerText = "GOTOWE!"

        pan = document.createElement("img")
        pan.setAttribute("id", "img" + Object.values(json.stepsForMachine)[i].number)
        if (Object.values(json.stepsForMachine)[i].operation === "miksowanie") {
            img = "/projekt_www/resources/pan_bzz.png"
        } else if (Object.values(json.stepsForMachine)[i].operation === "podgrzewanie") {
            img = "/projekt_www/resources/pan_fire.png"
        } else {
            img = "/projekt_www/resources/pan.png"
        }

        pan.setAttribute("src", img)

        col5.appendChild(pan)
        row1.appendChild(col5)

        titleText = Object.values(json.steps[i].title).toString()
        titleText = titleText.replaceAll(',', '')
        title.innerText = titleText

        descText = Object.values(json.steps[i].description).toString()
        descText = descText.replaceAll(',', '')
        desc.innerText = descText

        col7.appendChild(title)
        col7.appendChild(desc)

        row1.appendChild(col7)

        nextBtn.setAttribute("id", "button" + Object.values(json.stepsForMachine)[i].number)
        if (Object.values(json.stepsForMachine)[i].operation != "tryb") {
            nextBtn.innerText = "Kliknięcie spowoduje odczekanie " + Object.values(json.stepsForMachine)[i].additionalArguments[1].argumentValue + " sekund (przyspieszone dziesięciokrotnie)"
            nextBtn.setAttribute("onclick", "waitSeconds(" + Object.values(json.stepsForMachine)[i].additionalArguments[1].argumentValue + ")")
        }
        col12.appendChild(nextBtn)

        row2.appendChild(col12)

        content.appendChild(row1)
        content.appendChild(row2)

        modalwindow.appendChild(content)

        inner.appendChild(modalwindow)

        execCar.appendChild(inner)
    }
    inner.firstElementChild.classList.add("active")

}

function waitSeconds(sec) {
    start = Date.now();
    while (true) {
        elapsed = Date.now() - start
        if (elapsed <= sec * 10) {

        } else {
            return
        }
    }
}
