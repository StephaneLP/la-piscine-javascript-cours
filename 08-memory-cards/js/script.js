window.addEventListener('load', main)

let tabCases = document.querySelectorAll(".card")
let tabImages = ["alarmclock","baloon","box","butterfly","hat","paperplane","poolball","radio","rocket","rubikscube","television","tiebow"]

function main(){
    initCards()
    initListeners()
}

/****************************************************************************************
INITIALISATION DES CARTES
****************************************************************************************/

function initCards(){
    let tabTirageImages = randomArray(6,tabImages)
    let tabCards = [0,1,2,3,4,5,6,7,8,9,10,11]
    tabCards = randomArray(tabCards.length,tabCards)
    let tabPairesCards = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]

    for (let i=0; i<tabCases.length; i++){
        tabCases[i].children[0].children[1].style.backgroundImage = "url('img/question.svg')"
    }

    for(let i in tabTirageImages){
        tabCases[tabCards[i*2]].children[0].children[0].style.backgroundImage = "url('img/cards/" + tabTirageImages[i] + ".svg')"
        tabCases[tabCards[i*2+1]].children[0].children[0].style.backgroundImage = "url('img/cards/" + tabTirageImages[i] + ".svg')"
        tabPairesCards[i][0] = tabCards[i*2]
        tabPairesCards[i][1] = tabCards[i*2+1]
    }
}

/****************************************************************************************
INITIALISATION DES LISTENERS (EVENEMENT CLICK SUR LES CARTES)
****************************************************************************************/

function initListeners(){
    for(let i=0; i<tabCases.length; i++){
        tabCases[i].addEventListener("click",(e)=>{
            clickCard(e)
        })
    }
}

/****************************************************************************************
CLICK : ACTION SUR LES CARTES
****************************************************************************************/

function clickCard(e){
    e.currentTarget.children[0].classList.add("active");

}

/****************************************************************************************
OUTILS
****************************************************************************************/

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
