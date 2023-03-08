window.addEventListener('load', main)

let tabCases = document.querySelectorAll(".card")
let tabImages = ["alarmclock","baloon","box","butterfly","hat","paperplane","poolball","radio","rocket","rubikscube","television","tiebow"]

function main(){
    initCases()    
}

function initCases(){
    //chercher 6 indices dans tabImages



    let tabTirageImages = randomArray(6,tabImages)
    let tabCards = [0,1,2,3,4,5,6,7,8,9,10,11]
    tabCards = randomArray(tabCards.length,tabCards)
    let tabPairesCards = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]

    for(let i in tabTirageImages){
        tabCases[tabCards[i*2]].children[0].children[1].style.backgroundImage = "url('img/cards/" + tabTirageImages[i] + ".svg')"
        tabCases[tabCards[i*2+1]].children[0].children[1].style.backgroundImage = "url('img/cards/" + tabTirageImages[i] + ".svg')"
        tabPairesCards[i][0] = tabCards[i*2]
        tabPairesCards[i][1] = tabCards[i*2+1]
    }
    // console.log(tabPairesCards)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
}

function randomArray(n,array){
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










let tabLignesGagnantes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
let nbCliques = 0



function verification() {
    let ligneGagnante

    for(let i in tabLignesGagnantes){
        ligneGagnante = ""

        for(let j in tabLignesGagnantes[i]){
            ligneGagnante += tabCases[tabLignesGagnantes[i][j]].textContent
        }
        if(ligneGagnante === "XXX"){
            afficheLigneGagnante(i)
        }
        if(ligneGagnante === "OOO"){
            afficheLigneGagnante(i)
        }        
    }
}

function afficheLigneGagnante(i){
    for(let j in tabLignesGagnantes[i]){
        tabCases[tabLignesGagnantes[i][j]].style.backgroundColor = "green"
    }
}