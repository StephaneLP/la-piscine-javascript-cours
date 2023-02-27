// CALCUL DE L'IMC

let person_1 = {
    nom: 'Alex',
    height: 1.69,
    weight: 78,
}

let person_2 = {
    nom: 'John',
    height: 1.95,
    weight: 92,
}

person_1 = addIMC(person_1)
person_2 = addIMC(person_2)

console.log(compareIMC(person_1,person_2))

function addIMC(person) {
    person.imc = (person.weight/(person.height**2)).toFixed(2)
    return person
}

function compareIMC(person_1,person_2){
    let msg = "Nom : " + person_1.nom
    msg += "\nIMC : " + person_1.imc
    msg += "\n\nNom : " + person_2.nom
    msg += "\nIMC : " + person_2.imc

    let biggerPerson = person_1.imc > person_2.imc ? person_1 : person_2
    msg += '\n\n' + biggerPerson.nom + " a le plus grand IMC "

    return msg
}