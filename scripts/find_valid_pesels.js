onmessage = function show(event) {
    let last = event.data.last
    let checkSum = parseInt(last.charAt(4))
    let partCheckSum = (7 * parseInt(last.charAt(0)) % 10) + (9 * parseInt(last.charAt(1)) % 10) +  (parseInt(last.charAt(2)) % 10) + (3 * parseInt(last.charAt(3)) % 10)
    let generatedDates = []
    for(let q = 1; q < 3; q++){
        //r1
        for(let w = 0; w < 10; w++){
            //r2
            if((q == 1 && w <= 7) || ((q == 2) && (w >= 3))){
                continue;
            }
            for(let z = 0; z < 10; z++){
                //r3
                for(let x = 0; x < 10; x++){
                    //r4
                    for(let c = 0; c < 2; c++){
                        //m1
                        for(let v = 0; v < 10; v++){
                            //m2
                            if(c == 1 && v > 2){
                                continue
                            }
                            for(let b = 0; b < 4; b++){
                                //d1
                                for(let n = 0; n < 10; n++){
                                    //d2
                                    let fyear = q * 1000 +  w * 100 + z * 10 + x
                                    if(fyear < 1930){
                                        continue
                                    }
                                    if(fyear >= 2051){
                                        break
                                    }
                                    let leap = false
                                    if (fyear/400){
                                        leap = true
                                    }else if(fyear/100){
                                        leap = false
                                    }else if(fyear/4){
                                        leap = true
                                    }else{
                                        leap = false
                                    }
                                    fmonth = c * 10 + v
                                    fday = 10 * b + n
                                    if(fday == 0){
                                        continue
                                    }
                                    switch(fmonth){
                                        case 1:
                                        case 3:
                                        case 5:
                                        case 7:
                                        case 8:
                                        case 10:
                                        case 12:
                                            if(fday > 31){
                                                continue
                                            }
                                            break
                                        case 2:
                                            if(leap){
                                                if(fday > 29){
                                                    continue
                                                }
                                            }else if(fday > 28){
                                                continue
                                            }
                                            break
                                        case 4:
                                        case 6:
                                        case 9:
                                        case 11:
                                            if(fday > 30){
                                                continue
                                            }
                                            break
                                        default:
                                            continue
                                    }
                                    let checkDate = z + (x * 3) % 10 + (c * 7) % 10 + (v * 9) % 10 + b + (n * 3) % 10
                                    if(checkSum == (10 - (checkDate + partCheckSum) % 10)){
                                        let date = q.toString() + w.toString() + z.toString() + x.toString() + "." + c.toString() + v.toString() + "." + b.toString() + n.toString()
                                        generatedDates.push(date);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    postMessage(generatedDates)
}