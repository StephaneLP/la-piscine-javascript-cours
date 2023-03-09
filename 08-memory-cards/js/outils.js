export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
}

export function randomArray(n,array){
    let tab = array.slice()
    let tabRes = []
    let indice

    for(let i=0; i<n; i++){
        indice = getRandomIntInclusive(0, tab.length-1)
        tabRes.push(tab[indice])
        tab.splice(indice,1)
    }
    return tabRes
}

export function initArray(max) {
    let tab = []
    for(let i=0; i<max; i++) tab.push(i)
    return tab
}