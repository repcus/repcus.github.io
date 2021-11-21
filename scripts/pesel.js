var workerValidator
var workerFind
var workerShow

function validate(){
    workerValidator = new Worker("/scripts/validate_one_pesel.js");

    let year = String(document.querySelector("#year").value)
    let month = String(document.querySelector("#month").value)
    let day = String(document.querySelector("#day").value)
    let last = String(document.querySelector("#last").value)
    let good = checkDMY(day, month, year) && checkLast(last)

    if(good){
        workerValidator.onmessage = receivedWorkerMessage
        workerValidator.postMessage(
            {year : year,
            month : month,
            day : day,
            last : last}
        );
    
        function receivedWorkerMessage(event) {
            let valid = event.data;
            document.getElementById("valid").textContent = valid
            document.getElementById("valid").style.visibility = "visible"
        }
    }
}

function find(){
    workerFind = new Worker("/scripts/find_valid_pesels.js");
    let last = String(document.querySelector("#last").value)
    let good = checkLast(last)
}

function show(){
    workerShow = new Worker("/scripts/show_all_pesels.js");
    let year = String(document.querySelector("#year").value)
    let month = String(document.querySelector("#month").value)
    let day = String(document.querySelector("#day").value)
    let good = checkDMY(day, month, year)
    let generated = []
    if(good){
        workerShow.onmessage = receivedWorkerMessage
        workerShow.postMessage(
            {year : year,
            month : month,
            day : day}
        );
    
        function receivedWorkerMessage(event) {
            generated = event.data;
            makeTable(generated)
        }
    }
}

function makeTable(data){
    let parent = document.getElementById("toCalc")
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    parent.appendChild(document.createElement("p").appendChild(document.createTextNode("Possible PESELs")))
    for(let val in data){
        let pesel = data[val].toString().replace(",", "").replace(",", "").replace(",", "").replace(",", "").replace(",", "").replace(",", "").replace(",", "").replace(",", "").replace(",", "").replace(",", "")
        let p = document.createElement("p")
        let t = document.createTextNode(pesel.toString())
        p.appendChild(t)
        parent.appendChild(p)
    }
}

function checkDMY(day, month, year){
    let leap = false
    let fday = parseInt(day)
    let fmonth = parseInt(month)
    let fyear = parseInt(year)

    if(fyear < 1800 || fyear > 2299){
        alert("Year invalid!")
        return false
    }

    if (fyear/400){
        leap = true
    }else if(fyear/100){
        leap = false
    }else if(fyear/4){
        leap = true
    }else{
        leap = false
    }
    if(day <= 0 || day > 31){
        alert("Day invalid!")
        return false
    }
    switch(fmonth){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            break
        case 2:
            if(leap){
                if(fday > 29){
                    alert("Day invalid!")
                    return false
                }
            }else if(fday > 28){
                alert("Day invalid!")
                return false
            }
            break
        case 4:
        case 6:
        case 9:
        case 11:
            if(fday > 30){
                alert("Day invalid!")
                return false
            }
            break
        default:
            alert("Month invalid!")
            return false
    }
    return true
}

function checkLast(last){
    if(last.length != 5){
        return false
    }
    return true
}