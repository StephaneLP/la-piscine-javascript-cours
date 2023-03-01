const colors = ['#063c77', '#f19648', '#f5d259', '#d84f35']
let stageMain

let descContainerRectangles = [
    {
        x: 45, y: 45, w: 140, h: 75, color: "#ffffff", bgcolor: "#063c77", font: "bold 2.2rem Arial",
    },
    {
        x: 230, y: 45, w: 140, h: 75, color: "#ffffff", bgcolor: "#063c77", font: "bold 2.2rem Arial",
    },
    {
        x: 415, y: 45, w: 140, h: 75, color: "#ffffff", bgcolor: "#063c77", font: "bold 2.2rem Arial",
    }
]

let descContainerCircles = [
    {
        x: 115, y: 255, diametre: 70, color: "#000000", bgcolor: "#f19648", font: "bold 2.5rem Arial",
    },
    {
        x: 300, y: 255, diametre: 70, color: "#000000", bgcolor: "#f5d259", font: "bold 2.5rem Arial",
    },
    {
        x: 485, y: 255, diametre: 70, color: "#000000", bgcolor: "#d84f35", font: "bold 2.5rem Arial",
    },
    {
        x: 115, y: 460, diametre: 70, color: "#000000", bgcolor: "#23b01c", font: "bold 2.5rem Arial",
    },
    {
        x: 300, y: 460, diametre: 70, color: "#000000", bgcolor: "#65e95e", font: "bold 2.5rem Arial",
    },
    {
        x: 485, y: 460, diametre: 70, color: "#000000", bgcolor: "#31bd91", font: "bold 2.5rem Arial",
    }
]

let containerRectangles = []
let containerCircles = []

export default function main(stage) {
    let min = 5
    let max = 15
    let delta = 5

    stageMain = stage
    createRectangles(descContainerRectangles)
    createCircles(descContainerCircles)

    let reponse = initCircles(min,max)
    initRectangles(reponse, delta)
    initClickListener(reponse)
    
    return stageMain
}

function initClickListener(reponse){
    let msg = ""

    for(let index in containerRectangles){
        containerRectangles[index].addEventListener('click', (e) => {
            msg = (parseInt(containerRectangles[index].textRectangle.text) == reponse ? "Gagné!" : "Perdu!")    
            document.getElementById("resultat").innerText = msg
            document.getElementById("div-resultat").style.display = "block";
        })
    }
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
        // containerRectangle.cursor = "pointer"

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
        if(tab.indexOf(nombre) == -1){
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
