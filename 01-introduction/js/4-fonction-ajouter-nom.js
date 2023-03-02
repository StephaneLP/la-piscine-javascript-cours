// AJOUTER UN NOM AUX PRENOMS D'UN TABLEAU

let firstNames = ['Alain','Olivier','Justin','Adeline','Harry']
let fullNames = []

addName(firstNames,'Martin')
console.log(fullNames)

function addName(firstNames,lastName){
    for(let i in firstNames){
        fullNames.push(firstNames[i] + ' ' + lastName)
    }
}

let firstNames1 = ['Alain','Olivier','Justin','Adeline','Harry','Pierre']
let firstNames2 = ['Arthur','Olivier','Claire','William','Justin','Elise']

function tableauTotal(tab1,tab2){
    let tab = []

    for(let index in tab1){
        tab.push(tab1[index])
    }

    for(let index in tab2){
        if(tab1.includes(tab2[index])){
            tab.push(tab2[index])
        }

        // if(tab1.indexOf(tab2[index])==-1){
        //     tab.push(tab2[index])
        // }
    }
    return tab
}

console.log(tableauTotal(firstNames1,firstNames2))