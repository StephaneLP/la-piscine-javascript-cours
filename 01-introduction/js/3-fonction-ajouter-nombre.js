// FONCTION AJOUTER UN NOMBRE

let myNumber = 5
myNumber = addANumber(myNumber,3)

console.log("5 + 3 = " + myNumber)

function addANumber(myNumber,numberToAdd){
    myNumber += numberToAdd;
    return myNumber
}