window.onload = () => {
    let button = document.querySelector("#authorButton");
    button.addEventListener("click", author);
    button = document.querySelector("#close");
    button.addEventListener("click", author);
    button = document.querySelector("#startButton");
    button.addEventListener("click", start);
};

function author(){
    let footer = document.getElementById("author")
    let section = document.getElementById("buttons")
    let header = document.getElementById("title")
    let all = [footer, section, header]

    all.forEach(element => {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
        }else{
            element.classList.add('hidden');
        }
    });
}

function start(){
    document.getElementById("title").classList.add('animate')
    document.getElementById("buttons").classList.add('hidden')
    document.getElementById("spu1").style.display = "none"
    document.getElementById("spu2").style.display = "none"
    document.getElementById("input").style.display = "inline-block"
    document.getElementById("author_text").style.display = "none"
    document.getElementById("word").style.display = "grid"
    document.getElementById("lifes").innerHTML = "Liczba żyć: " + document.getElementById('numlifes').innerHTML
    document.getElementById("lifes").innerHTML = '0'
    let list = []
    loadJSON(function(response) {
        let words = JSON.parse(response);
        for(let i = 0; i < words.length; i++){
            let word = words[i]
            for(let key in word){
                let letters = word[key]
                list.push(letters)
            }
        }
        let len = 0;
        let randomVal = (Math.random() * 10).toString().charAt(0)
        randomVal = parseInt(randomVal)
        chosenWord = list[randomVal]
        let parent = document.getElementById("word")
        for(let i = 0; i < chosenWord.length; i++){
            let single = document.createElement("div")
            single.setAttribute("class", "letter")
            single.setAttribute("id", ("letter" + i))
            len += 1
            single.appendChild(document.createTextNode(chosenWord[i]))
            parent.appendChild(single)
        }
        let cols = ("1fr ".repeat(len))
        document.getElementById("word").style.gridTemplateColumns = cols
    })
}

function loadJSON(callback) {   

    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '../resources/questions/q.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
 }

 function check(){
    let lifes = document.getElementById("numlifes").innerHTML
    let letter = document.querySelector("#litera").value
    let word = ""
    for(let q = 0; q < 14; q++){
        if(document.getElementById("letter" + q) != null){
            word += document.getElementById("letter" + q).innerHTML
        }
    }
    let jest = false
    let success = document.getElementById("numsuccess").innerHTML
    console.log(success)
    for(let i = 0; i < word.length; i++){
        if(word[i] == letter){
            jest = true
            document.getElementById("success").classList.remove("wrong")
            document.getElementById("letter" + i).style.color = "black"
            success++
        }
    }
    
    if(!jest){
        document.getElementById("success").classList.add('wrong')
        lifes--
    }else{
        jest = false
    }
    if(lifes == 0){
        document.getElementById("lifes").innerHTML = "Liczba żyć: 0"
        for(let i = 0; i < word.length; i++){
            document.getElementById("letter" + i).style.color = "crimson"
        }
        document.getElementById("fail").style.display = "inline-block"
        document.getElementById("success").style.display = "none"
        alert("Przegrana!")
    }
    document.getElementById("numsuccess").innerHTML = success
    if(success == word.length){
        for(let i = 0; i < word.length; i++){
            document.getElementById("word").removeChild(document.getElementById("letter" + i))
        }
        alert("Wygrana!")
        document.getElementById('numlifes').innerHTML = lifes + 5
        document.getElementById('numsuccess').value = 0
        start()
    }
    document.getElementById("lifes").innerHTML = "Liczba żyć: " + lifes
    document.getElementById('numlifes').innerHTML = lifes
    document.getElementById('numsuccess').value = 0
    document.getElementById('litera').value = ''
 }