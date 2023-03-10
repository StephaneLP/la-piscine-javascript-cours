import movies from "./movies.json" assert { type: 'json' };

// init()

// function init() {
//     let result = getAllTitles(movies)
//     console.log(result);
// }

// function getAllTitles(movies){

// }

// a. Logger le premier element du tableau movies
console.log("Premier film du tableau : " + movies[0].title)

// b. Logger l'annee du 4eme element du tableau movies
console.log("Année du 4ème film du tableau : " + movies[3].year)

// c. Logger le titre du dernier element du tableau movies
console.log("Dernier film du tableau : " + movies[movies.length-1].title)

// d. Logger le titre du film qui a la meilleure note
function bestNote(tab){
    let result
    let note = 0
    for(let i in tab){
        if(tab[i].rate > note){
            note = tab[i].rate
            result = tab[i].title
        }
    }
    return result
}
console.log("Film ayant la meilleure note : " + bestNote(movies))

// e. Logger le titre du film le plus ancien
function olderMovie(tab){
    let result
    let annee = tab[0].year
    for(let i in tab){
        if(tab[i].year < annee){
            annee = tab[i].year
            result = tab[i].title
        }
    }
    return result    
}
console.log("Film le plus ancien : " + olderMovie(movies))

// f. Logger tous les titres de film qui ont au moins 3 acteurs
function moreThreeActors(tab){
    let result = []
    for(let i in tab){
        if(tab[i].actors.length > 2){
            result.push(tab[i].title)
        }
    }
    return result    
}
console.log("Films ayant au moins 3 acteur : " + moreThreeActors(movies))

// 1. Ecrire une fonction qui prend en parametre le tableau movies et qui retourne un nouveau tableau de tous les titres de films
function tabTitles(tab){
    let result = []
    for(let i in tab){
        result.push(tab[i].title)
    }
    return result    
}
console.log("Tableau de tous les titres : " + tabTitles(movies))

function tabTitlesMap(tab){
    return tab.map(e => e.title)   
}
console.log("Tableau de tous les titres avec map : " + tabTitlesMap(movies))


// 2. Ecrire une fonction qui prend en parametre une annee et un tableau (movies), et qui retourne un nouveau tableau de titres de film de l'annee specifiee
function tabTitlesByYear(annee,tab){
    let result = []
    for(let i in tab){
        if(tab[i].year===annee) result.push(tab[i].title)
    }
    return result    
}
console.log("Films de l'année 1994 : " + tabTitlesByYear(1994,movies))

// 3. Ecrire une fonction qui prend en parametre un realisateur et un tableau (movies), et qui retourne un nouveau tableau de tous les titres de films de ce realisateur
function tabTitlesByRealisator(real,tab){
    let result = []
    for(let i in tab){
        if(tab[i].director===real) result.push(tab[i].title)
    }
    return result    
}
console.log("Films réalisés par Christopher Nolan : " + tabTitlesByRealisator("Christopher Nolan",movies))