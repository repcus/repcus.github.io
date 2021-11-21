//niegotowe

onmessage = function show(event) {
    let last = event.data.last

    if(parseInt(year) >= 1800 && parseInt(year) <= 1899){
        month = (parseInt(month[0]) + 8).toString() + month[1]
    }else if(parseInt(year) >= 2000 && parseInt(year) <= 2099){
        month = (parseInt(month[0]) + 2).toString() + month[1]
    }else if(parseInt(year) >= 2100 && parseInt(year) <= 2199){
        month = (parseInt(month[0]) + 4).toString() + month[1]
    }else if(parseInt(year) >= 2200 && parseInt(year) <= 2299){
        month = (parseInt(month[0]) + 6).toString() + month[1]
    }

    let peselToBe = last
    peselToBe = [parseInt(peselToBe[0]), parseInt(peselToBe[1]), parseInt(peselToBe[2]), parseInt(peselToBe[3]), parseInt(peselToBe[4]), parseInt(peselToBe[5])]
    let generatedPesels = []
    let partCheckSum = peselToBe[0] + (peselToBe[1] * 3) % 10 + (peselToBe[2] * 7) % 10 + (peselToBe[3] * 9) % 10 + peselToBe[4] + (peselToBe[5] * 3) % 10

    for(let z = 0; z < 10; z++){
        for(let x = 0; x < 10; x++){
            for(let c = 0; c < 10; c++){
                for(let v = 0; v < 10; v++){
                    for(let b = 0; b < 10; b++){
                        if(b === 10 - (partCheckSum + (z * 7) % 10 + (x * 9) % 10 + c + (v * 3) % 10) % 10){
                            generatedPesels.push([peselToBe[0],peselToBe[1], peselToBe[2] , peselToBe[3] , peselToBe[4], peselToBe[5], z, x, c, v, b])
                        }
                    }
                }
            }
        }
    }
    postMessage(generatedPesels)
}