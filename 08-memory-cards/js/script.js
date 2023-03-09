import {getRandomIntInclusive, randomArray, initArray} from "./outils.js"

window.addEventListener('load', main)

let tabCases = document.querySelectorAll(".card")
let tabImages = ["alarmclock","baloon","box","butterfly","hat","paperplane","poolball","radio","rocket","rubikscube","television","tiebow"]
let tabCardsImages = []
let firstImage = []
let secondImage = []
let nbCoups = 0
let duree = 0
let isCliquable = false
let nbPaires = 0
let inGame = false

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
        tabCases[i].addEventListener("click",clickCard)
    }
    document.querySelector("#btnGo").addEventListener("click",(e)=>{
        goGame()
    })
}

/****************************************************************************************
DEBUT ET FIN DU JEU
****************************************************************************************/

function goGame(){
    document.querySelector("#resultat").style.display = "none"
    inGame = true
    isCliquable = true
    setInterval(afficheTemps,1000)
}

function afficheTemps(){
    duree +=1
    document.querySelector("#duree").textContent = duree
}

function endGame(){
    let msg = ""
    msg = "Vous avez terminé la partie en :<br>"
    msg += duree + " secondes<br>"
    msg += nbCoups + " coups"

    inGame = false
    isCliquable = false
    nbCoups = 0
    duree = 0

    let myDiv = document.querySelector("#libelle-resultat")

    .textContent = "Test"
    document.querySelector("#btnGo").textContent = "Rejouer"
    document.querySelector("#resultat").style.display = "block"
    document.querySelector("#duree").textContent = "0"
    document.querySelector("#nbCoups").textContent = "0"
}

/****************************************************************************************
CLICK : ACTION SUR LES CARTES
****************************************************************************************/

function clickCard(e){
    let indice = e.currentTarget.getAttribute("data-index")
    let image = tabCardsImages[indice]

    if((!isCliquable)||(indice===firstImage[0])) return

    e.target.children[0].classList.add("active");
    if(firstImage.length===0){
        firstImage[0] = indice
        firstImage[1] = image
        tabCases[indice]   
    }
    else{
        if(image===firstImage[1]){
            tabCases[indice].removeEventListener("click", clickCard);
            tabCases[firstImage[0]].removeEventListener("click", clickCard);
            tabCases[indice].classList.remove("hov")
            tabCases[firstImage[0]].classList.remove("hov")
            tabCases[indice].style.cursor = "auto"
            tabCases[firstImage[0]].style.cursor = "auto"
            firstImage = []
            nbPaires +=1
            
            if(nbPaires==6) endGame()
        }
        else{
            secondImage = [indice,image]
            isCliquable = false
            setTimeout(retournerCartes,1000)
        }
        nbCoups += 1
        document.querySelector("#nbCoups").textContent = nbCoups
    }
}

function retournerCartes(){
    tabCases[firstImage[0]].children[0].classList.remove("active"); 
    tabCases[secondImage[0]].children[0].classList.remove("active"); 
    firstImage = []
    secondImage = []
    isCliquable = true
}