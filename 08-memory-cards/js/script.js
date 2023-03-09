window.addEventListener('load', main)

let tabCases = document.querySelectorAll(".card")
let tabImages = ["alarmclock","baloon","box","butterfly","hat","paperplane","poolball","radio","rocket","rubikscube","television","tiebow"]
let tabCardsImages = []
let firstImage = []

function main(){
    initCards()
    initListeners()
}

/****************************************************************************************
INITIALISATION DES CARTES
****************************************************************************************/

function initCards(){
    let tabTirageImages = randomArray(6,tabImages)
    let tabCardsIndices = initArray(12)
    tabCardsIndices = randomArray(tabCardsIndices.length,tabCardsIndices)

    for (let i=0; i<tabCases.length; i++){
        tabCases[i].children[0].children[1].style.backgroundImage = "url('img/question.svg')"
    }

    for(let i in tabTirageImages){
        const indice1 = tabCardsIndices[i*2]
        const indice2 = tabCardsIndices[i*2+1]

        tabCases[indice1].children[0].children[0].style.backgroundImage = "url('img/cards/" + tabTirageImages[i] + ".svg')"
        tabCases[indice2].children[0].children[0].style.backgroundImage = "url('img/cards/" + tabTirageImages[i] + ".svg')"
        tabCardsImages[indice1] = tabTirageImages[i]
        tabCardsImages[indice2] = tabTirageImages[i]
    }
}

/****************************************************************************************
INITIALISATION DES LISTENERS (EVENEMENT CLICK SUR LES CARTES)
****************************************************************************************/

function initListeners(){
    for(let i=0; i<tabCases.length; i++){
        tabCases[i].addEventListener("click",actionClick)
    }
}

function actionClick(e){
    clickCard(e)
}

/****************************************************************************************
CLICK : ACTION SUR LES CARTES
****************************************************************************************/

function clickCard(e){
    let indice = e.currentTarget.getAttribute("data-index")
    let image = tabCardsImages[indice]

    e.currentTarget.children[0].classList.add("active");
    if(firstImage.length===0){
        firstImage[0] = indice
        firstImage[1] = image
    }
    else{
        if(image===firstImage[1]){
            tabCases[indice].removeEventListener("click", actionClick);
            tabCases[firstImage[0]].removeEventListener("click", actionClick);
            tabCases[indice].classList.remove("hov")
            tabCases[firstImage[0]].classList.remove("hov")
            tabCases[indice].style.cursor = "auto"
            tabCases[firstImage[0]].style.cursor = "auto"
        }
        else{
            tabCases[indice].removeEventListener("click", actionClick);
            tabCases[firstImage[0]].removeEventListener("click", actionClick);
            tabCases[indice].classList.remove("hov")
            tabCases[firstImage[0]].classList.remove("hov")
            tabCases[indice].style.cursor = "auto"
            tabCases[firstImage[0]].style.cursor = "auto"
        }
        firstImage = []
    }
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

function initArray(max) {
    let tab = []
    for(let i=0; i<max; i++) tab.push(i)
    return tab
}