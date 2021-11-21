onmessage = function validate(event) {
    let year = event.data.year
    let month = event.data.month
    let day = event.data.day
    let last = event.data.last

    let valid = "error";

    if(parseInt(year) >= 1800 && parseInt(year) <= 1899){
        month = (parseInt(month[0]) + 8).toString() + month[1]
    }else if(parseInt(year) >= 2000 && parseInt(year) <= 2099){
        month = (parseInt(month[0]) + 2).toString() + month[1]
    }else if(parseInt(year) >= 2100 && parseInt(year) <= 2199){
        month = (parseInt(month[0]) + 4).toString() + month[1]
    }else if(parseInt(year) >= 2200 && parseInt(year) <= 2299){
        month = (parseInt(month[0]) + 6).toString() + month[1]
    }

    let pesel = year.substr(2,4) + month + day + last
    let checkSum = parseInt(pesel[0]) + (parseInt(pesel[1]) * 3) % 10 + (parseInt(pesel[2]) * 7) % 10 + (parseInt(pesel[3]) * 9) % 10 + parseInt(pesel[4]) + (parseInt(pesel[5]) * 3) % 10 + (parseInt(pesel[6]) * 7) % 10 + (parseInt(pesel[7]) * 9 ) % 10+ parseInt(pesel[8]) + (parseInt(pesel[9]) * 3) % 10
    checkSum = 10 - checkSum % 10

    if(parseInt(pesel[10]) === checkSum){
        valid = "pesel valid"
    }else{
        valid = "pesel not valid"
    }
    
    postMessage(valid)
}