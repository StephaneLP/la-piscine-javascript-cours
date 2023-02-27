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