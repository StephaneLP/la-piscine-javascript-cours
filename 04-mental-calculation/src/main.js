const colors = ['#063c77', '#f19648', '#f5d259', '#d84f35']
let stageMain

let descContainerRectangles = [
    {
        x: 45, y: 45, w: 140, h: 90, color: "#ffffff", bgcolor: "#063c77", font: "bold 2.2rem Arial",
    },
    {
        x: 230, y: 45, w: 140, h: 90, color: "#ffffff", bgcolor: "#063c77", font: "bold 2.2rem Arial",
    },
    {
        x: 415, y: 45, w: 140, h: 90, color: "#ffffff", bgcolor: "#063c77", font: "bold 2.2rem Arial",
    }
]

let descContainerCircles = [
    {
        x: 115, y: 260, diametre: 70, color: "#000000", bgcolor: "#f19648", font: "bold 2.5rem Arial",
    },
    {
        x: 300, y: 260, diametre: 70, color: "#000000", bgcolor: "#f5d259", font: "bold 2.5rem Arial",
    },
    {
        x: 485, y: 260, diametre: 70, color: "#000000", bgcolor: "#d84f35", font: "bold 2.5rem Arial",
    },
    {
        x: 115, y: 470, diametre: 70, color: "#000000", bgcolor: "#23b01c", font: "bold 2.5rem Arial",
    },
    {
        x: 300, y: 470, diametre: 70, color: "#000000", bgcolor: "#65e95e", font: "bold 2.5rem Arial",
    },
    {
        x: 485, y: 470, diametre: 70, color: "#000000", bgcolor: "#31bd91", font: "bold 2.5rem Arial",
    }
]

let containerRectangles = []
let containerCircles = []
let time = 1800
let level = 1
let gameBegin = false
let newGame = true
let min = 0, mininit = 0
let max = 10, maxinit = 10
let delta = 5
let score = 0

export default function main(stage) {
    stageMain = stage

    // Initialisation des figures
    createRectangles(descContainerRectangles)
    createCircles(descContainerCircles)

    // Initialisation du bouton goGame
    let myBtn = document.querySelector(".btn-goGame")
    myBtn.addEventListener("click",goGame)

    // Afficher le bouton goGame
    document.querySelector(".btn-goGame").textContent =  "Go!"
    document.querySelector(".msg-goGame").textContent =  "Lancer le jeu"
    document.querySelector(".div-goGame").style.display = "block";

    let tempsRestant
    createjs.Ticker.timingMode = createjs.Ticker.RAF
    createjs.Ticker.addEventListener("tick", () => {
        if((time%60==0)&&(!newGame)){
            tempsRestant = time/60
            document.querySelector(".timer").textContent = tempsRestant.toString() + "s"
        }
        if(gameBegin){
            if(time==0){
                endTick()
            }
            else{
                time -= 1;
            }
        }

        stage.update()
    })

    return stageMain
}
 
//////////////////////////////////////////////////////
// CREATION DES CONTAINEURS RECTANGLES ET CIRCLES 
//////////////////////////////////////////////////////

function createRectangles(tabDescription){
    for(let i in tabDescription){
        let rectangle = new createjs.Shape()
        rectangle.graphics.beginFill(tabDescription[i].bgcolor).drawRect(0, 0, tabDescription[i].w, tabDescription[i].h)
        rectangle.width = tabDescription[i].w
        rectangle.height = tabDescription[i].h
        

        let textRectangle = new createjs.Text("",tabDescription[i].font,tabDescription[i].color)
        textRectangle.textAlign = "center"
        textRectangle.textBaseline = "middle"
        textRectangle.x = rectangle.width/2
        textRectangle.y = rectangle.height/2

        let containerRectangle = new createjs.Container()
        containerRectangle.addChild(rectangle,textRectangle)
        containerRectangle.x = tabDescription[i].x
        containerRectangle.y = tabDescription[i].y
        containerRectangle.textRectangle = textRectangle
        containerRectangle.cursor = "pointer"
        // containerRectangle.visible = true

        containerRectangles.push(containerRectangle)
        stageMain.addChild(containerRectangle)
    }
}

function createCircles(tabDescription){
    for(let i in tabDescription){
        let circle = new createjs.Shape()
        circle.graphics.beginFill(tabDescription[i].bgcolor).drawCircle(0, 0, tabDescription[i].diametre)

        let textCircle = new createjs.Text("",tabDescription[i].font,tabDescription[i].color)
        textCircle.textAlign = "center"
        textCircle.textBaseline = "middle"
        textCircle.x = circle.diametre/2
        textCircle.y = circle.diametre/2

        let containerCircle = new createjs.Container()
        containerCircle.addChild(circle,textCircle)
        containerCircle.x = tabDescription[i].x
        containerCircle.y = tabDescription[i].y
        containerCircle.textCircle = textCircle

        containerCircles.push(containerCircle)
        stageMain.addChild(containerCircle)
    }
}

//////////////////////////////////////////////////////
// LANCEMENT DE LA PARTIE 
//////////////////////////////////////////////////////

function goGame() {
    document.querySelector(".div-goGame").style.display = "none"
    document.querySelector(".lvl").innerHTML = level.toString()
    document.querySelector(".score").innerHTML = score.toString()

    let reponse = initCircles(min,max)
    initRectangles(reponse, delta)

    for(let index in containerRectangles){
        containerRectangles[index].handlerListener = containerRectangles[index].addEventListener("click", (e) => {
            endGame(e,reponse)})
    }

    gameBegin = true
    newGame = false
}

function endGame(e,reponse) {
    let goodResponse = (parseInt(e.currentTarget.textRectangle.text) == reponse)

    if(goodResponse){
        document.querySelector(".btn-goGame").textContent = "Niveau suivant"
        document.querySelector(".msg-goGame").textContent = "Gagné!"
        level += 1
        min = level*3
        max = level*8
        score += parseInt(document.querySelector(".timer").textContent)
        document.querySelector(".timer").textContent = score
    }
    else{
        document.querySelector(".btn-goGame").textContent = "Rejouer"
        document.querySelector(".msg-goGame").textContent = "Perdu!"
        level = 1
        min = mininit
        max = maxinit
    }
    document.querySelector(".div-goGame").style.display = "block"
    razListeners()
    time = 1800
    gameBegin = false
}

function endTick() {
    document.querySelector(".btn-goGame").textContent = "Rejouer"
    document.querySelector(".msg-goGame").textContent = "Perdu!"
    document.querySelector(".div-goGame").style.display = "block"
    level = 1
    min = mininit
    max = maxinit
    razListeners()
    time = 1800
    gameBegin = false
}

function razListeners() {
    for(let index in containerRectangles){
        containerRectangles[index].removeEventListener("click", containerRectangles[index].handlerListener)
    }
}

//////////////////////////////////////////////////////
// INITIALISATION DES NOMBRES ALEATOIRES 
//////////////////////////////////////////////////////

function initCircles(min, max){
    let tabNombres = initTabNombres(min,max,containerCircles.length)
    let total = 0

    for(let index in containerCircles){
        containerCircles[index].textCircle.text = tabNombres[index]
        total += tabNombres[index]
    }

    return total
}

function initTabNombres(min, max, l){
    let tab = []
    let i = 0
    let nombre = 0

    while (i<l) {
        nombre = getRandomIntInclusive(min, max)
        if((tab.indexOf(nombre) == -1)&&(nombre != 0)){
            tab[i] = nombre
            i += 1
        }
    }
    return tab
}

function initRectangles(reponse, delta){
    let tabReponses = initTabtReponses(reponse, delta, containerRectangles.length)

    for(let index in containerRectangles){
        containerRectangles[index].textRectangle.text = tabReponses[index]
    }
}

function initTabtReponses(reponse, delta, l){
    let min = reponse - delta
    let max = reponse + delta
    let positionRep = getRandomIntInclusive(0, 2)

    let tab = []
    let i = 0
    let nombre = 0

    while (i<l) {
        if(i == positionRep){
            tab[i] = reponse
            i += 1
        }
        else{
            nombre = getRandomIntInclusive(min, max)
            if((tab.indexOf(nombre) == -1)&&(nombre!=reponse)){
                tab[i] = nombre
                i += 1
            }
        }
    }
    return tab
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
}
