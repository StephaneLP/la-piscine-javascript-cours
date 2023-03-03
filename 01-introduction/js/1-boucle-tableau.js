// METHODE 1

// let tab = [12,56,85,14,12,78]
// let l = tab.length
// let res = 0;
// for(let i=0;i<l;i++){
//     res += tab[i]
// }
// console.log(res)

// METHODE 2

// let tab = [12,56,85,14,12,78]
// let res = 0;
// for(var item in tab){
//      res += tab[item]    
// }
// console.log(res)

// METHODE 3

// let tab = [12,56,85,14,12,78]
// let res = 0;
// tab.forEach(item => {
//     res += item    
// })

// console.log(res)

let pizzas = [
    {
        name: 'Margherita',
        price: 11.50,
        ingredients: ['mozzarella', 'tomate', 'basilic ', "huile d'olive"],
        baseTomate: true
    },
    {
        name: 'Regina',
        price: 12,
        ingredients: ['mozzarella', 'tomate', 'origan', 'jambon', 'champignons'],
        baseTomate: true
    },
    {
        name: '4 saisons',
        price: 15,
        ingredients: ['artichaut', 'courgette', 'poivron', 'mozzarella', 'oignon rouge'],
        baseTomate: true
    },
    {
        name: 'Napolitaine',
        price: 14,
        ingredients: ['tomate', 'mozzarella', 'anchois', 'olives noires', 'origan'],
        baseTomate: true
    },
    {
        name: '4 fromages',
        price: 16,
        ingredients: ['tomate', 'mozzarella', 'emmental', 'comté', 'roquefort'],
        baseTomate: true
    },
    {
        name: 'Montagnarde',
        price: 19,
        ingredients: ['mozzarella', 'reblochon', 'gruyère', 'oignon', 'champignon'],
        baseTomate: false
    },
    {
        name: 'Chèvre-miel',
        price: 18,
        ingredients: ['mozzarella', 'chèvre', 'miel'],
        baseTomate: false
    },
    {
        name: 'Hawaïenne',
        price: 17,
        ingredients: ['mozzarella', 'tomate', 'jambon', 'ananas'],
        baseTomate: true
    }
]

// 1. Ecrire une fonction qui prend en argument le tableau pizzas et qui retourne le prix moyen des pizzas
// 2. Ecrire une fonction qui prend en argument un nom de pizza et qui retourne un tableau des ingredients de cette pizza
// 3. Ecrire une fonction qui prend en argument un tableau de pizzas et qui retourne un tableau de tous les ingredients, 
//    en evitant les elements dupliques
// 4. Ecrire une fonction qui prend en argument un ingredient et qui retourne un tableau des noms des pizzas qui ont cet ingredient

function prixmoyen(tab){
    var somme = 0
    for(let i in tab){
        somme += tab[i].price
    }
    return somme/tab.length
}

console.log("Prix moyen : " + prixmoyen(pizzas))

function ingredients(tab,nom){
    for(let i in tab){
        if(tab[i].name == nom){
            return tab[i]
        }
    }
}

console.log(ingredients(pizzas,"Montagnarde"))

function allingredients(tab){
    let tabres = []
    for(let i in tab){
        for(let j in tab[i].ingredients){
            if(!tabres.includes(tab[i].ingredients[j])) tabres.push(tab[i].ingredients[j])
        }
    }
    return tabres
}

console.log(allingredients(pizzas))

function pizzaswithingredients(tab,nom){
    let tabres = []
    for(let i in tab){
        for(let j in tab[i].ingredients) if(tab[i].ingredients[j] == nom) tabres.push(tab[i])
    }
    return tabres
}

console.log(pizzaswithingredients(pizzas,"tomate"))
