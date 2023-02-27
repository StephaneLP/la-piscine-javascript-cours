
// OBJETS IDENTITES

let identite_1 = {
    prenoms: ['Pierre','Richard'],
    age: 16,
    ville: 'Bordeaux',
    permis: false,
}

let identite_2 = {
    prenoms: ['Bernard','Lermitte'],
    age: 25,
    ville: 'Paris',
    permis: true,
}

let identites = [identite_1,identite_2]

let res = ""

// AFFICHER LE DERNIER PRENOM

res = identite_1.prenoms[identite_1.prenoms.length-1]
console.log("Dernier prénom de identite_1 : " + res)

// BOUCLE TEST MINEUR/MAJEUR

let statut = ""
res = ""
for(let item in identites){
    statut = (identites[item].age < 18 ? "mineur" : "majeur")
    res += identites[item].prenoms[0] + " est " + statut + " / âge = " + identites[item].age + "\n"
}
console.log(res)