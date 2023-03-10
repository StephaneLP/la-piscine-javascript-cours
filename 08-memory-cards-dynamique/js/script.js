import {getRandomIntInclusive, randomArray, initArray} from "./outils.js"

window.addEventListener('load', main)

let tabImages = ["alarmclock","baloon","box","butterfly","hat","paperplane","poolball","radio","rocket","rubikscube","television","tiebow"]
let tabCases
let nbCards
let inGame = false
let tabCardsImages = []
let nbCoups = 0
let duree = 0
let nbPaires = 0
let isCliquable = false
let firstImage = []
let secondImage = []

function main(){
    document.querySelector("#btnGo").addEventListener("click",(e)=>{
        goGame()
    })
    afficheModal(true,true)
    setInterval(afficheTemps,1000)
}

function afficheModal(isVisible, isNew){
    document.querySelector("#modal-box").style.visibility = (isVisible ? "visible" : "hidden")
    document.querySelector("#modal-box-accueil").style.display = (isNew ? "block" : "none")
    document.querySelector("#modal-box-msg").style.display = (isNew ? "none" : "block")
}

function afficheTemps(){
    if(inGame){
        duree +=1
        document.querySelector("#duree").textContent = duree
    }
}

/****************************************************************************************
DEBUT ET FIN DU JEU
****************************************************************************************/

function goGame(){
    nbCards = document.querySelector('input[name=lvl]:checked').value
    createCards()
    initCards()    
    initListeners()

    nbCoups = 0
    duree = 0
    nbPaires = 0
    inGame = true
    isCliquable = true
    document.querySelector("#duree").textContent = duree
    document.querySelector("#nbCoups").textContent = nbCoups
    document.querySelector("#infos").style.visibility = "visible"
    afficheModal(false,false) 
}

function endGame(){
    let msg = ""
    msg = "Vous avez terminé la partie en :<br>"
    msg += duree + " secondes<br>"
    msg += nbCoups + " coups"

    inGame = false
    isCliquable = false

    document.querySelector("#modal-box-msg").innerHTML = msg
    document.querySelector("#btnGo").textContent = "Rejouer"
    afficheModal(true,false)
}

/****************************************************************************************
CREATION & INITIALISATION DES CARTES ET LISTENERS
****************************************************************************************/

function createCards(){
    let section = document.querySelector("#cards")
    section.replaceChildren()
    for(let i=0; i<nbCards; i++){
        let recto = document.createElement("div")
        recto.className = "recto"

        let verso = document.createElement("div")
        verso.className = "verso"

        let dblface = document.createElement("div")
        dblface.className = "double-face"
        dblface.appendChild(recto)
        dblface.appendChild(verso)

        let card = document.createElement("div")
        card.className = "card hov"
        card.setAttribute("data-index",i)
        card.appendChild(dblface)

        section.appendChild(card)        
    }
    tabCases = document.querySelectorAll(".card")
}

function initCards(){
    let tabTirageImages = randomArray(nbCards/2,tabImages)
    tabTirageImages = tabTirageImages.concat(tabTirageImages)
    tabCardsImages = randomArray(tabTirageImages.length,tabTirageImages)

    for (let i=0; i<nbCards; i++){
        tabCases[i].children[0].children[1].style.backgroundImage = "url('img/question.svg')"
        tabCases[i].children[0].children[0].style.backgroundImage = "url('img/cards/" + tabCardsImages[i] + ".svg')"
    }
}

function initListeners(){
    for(let i=0; i<nbCards; i++){
        tabCases[i].addEventListener("click",clickCard)
    }
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
            nbCoups += 1
            if(nbPaires==(nbCards/2)) endGame()
        }
        else{
            secondImage = [indice,image]
            isCliquable = false
            nbCoups += 1
            setTimeout(retournerCartes,1000)
        }
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