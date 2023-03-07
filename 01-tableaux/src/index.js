import games from "./games.json" assert { type: 'json' };

init()

function init() {
    console.log(games);

    // 1.
    console.log(nameGames(games))

    // 2.
    console.log(nameGamesFromYear(games,2020))

    // 3.
    console.log(bestGames(games))

    // 4.
    console.log(gamesFromConsole(games,"PC"))
}

function nameGames(tab) {
    let res = []

    tab.forEach((e) => {
        res.push(e.title)
    })

    return res
}

function nameGamesFromYear(tab,year){
    let res = []

    tab.forEach((e) => {
        if(e.year == year) res.push(e.title)
    })

    return res 
}

function bestGames(tab){
    let res = []
    
    tab.forEach((e) =>{
        if(e.rate >= 8) res.push(e.title)
    })

    return res
}


function gamesFromConsole(tab,GameConsole){
    let res = []

    tab.forEach((e) => {
        if(e.devices.includes(GameConsole)) res.push(e.title)
    })

    return res
}

// 1. Ecrire une fonction qui prend en parametre le tableau games et qui retourne un nouveau tableau de tous les noms de jeux (.title)
// 2. Ecrire une fonction qui prend en parametre une annee et un tableau (games), et qui retourne un nouveau tableau de noms de jeux de l'annee specifiee
// 3. Ecrire une fonction qui prend en parametre un tableau (games) retourne un tableau de noms de jeux, a condition que leur note soit superieur ou egal a 8
// 4. Ecrire une fonction qui prend en parametre une console et un tableau (games), et qui retourne un nouveau tableau de tous les jeux disponibles sur cette console
