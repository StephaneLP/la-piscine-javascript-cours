const colors = ['#063c77', '#f19648', '#f5d259', '#d84f35']

function createContainer(x,y){
    let rectangle = new createjs.Shape();
    rectangle.graphics.beginFill("yellow").drawRect(0, 0, 100, 50);
    rectangle.width = 100;
    rectangle.height = 50

    let textRectangle = new createjs.Text("rectangle","bold 1rem Arial","black")
    textRectangle.textAlign = "center"
    textRectangle.textBaseline = "middle"
    textRectangle.x = rectangle.width/2;
    textRectangle.y = rectangle.height/2;

    let containerRectangle = new createjs.Container();
    containerRectangle.addChild(rectangle,textRectangle);
    containerRectangle.x = x
    containerRectangle.y = y
    containerRectangle.textRectangle = textRectangle

    return containerRectangle
}

function createCircle(x,y,diametre,color){
    let circle = new createjs.Shape();
    circle.graphics.beginFill(color).drawCircle(0, 0, diametre);
    // circle.x = x;
    // circle.y = y;

    let textCircle = new createjs.Text("disque","bold 1rem Arial","black")
    textCircle.textAlign = "center"
    textCircle.textBaseline = "middle"
    textCircle.x = circle.diametre/2;
    textCircle.y = circle.diametre/2;

    let containerCircle = new createjs.Container();
    containerCircle.addChild(circle,textCircle);
    containerCircle.x = x
    containerCircle.y = y
    containerCircle.textCircle = textCircle

    return containerCircle
}

export default function main(stage) {
    let containerRectangle1 = createContainer(50,50)
    let containerRectangle2 = createContainer(175,50)
    let containerRectangle3 = createContainer(300,50)

    let circle1 = createCircle(100,250,50,"#f19648")
    let circle2 = createCircle(225,250,50,"#f5d259")
    let circle3 = createCircle(350,250,50,"#d84f35")

    stage.addChild(containerRectangle1,containerRectangle2,containerRectangle3,circle1,circle2,circle3);

    let tabNombres = [0,0,0]
    initTabNombres(tabNombres,10,20)

    circle1.textCircle.text = tabNombres[0]
    circle2.textCircle.text = tabNombres[1]
    circle3.textCircle.text = tabNombres[2]

    let sommeExacte = tabNombres[0] + tabNombres[1] + tabNombres[2]
    let tabReponses = [0,0,0]
    initReponses(tabReponses,sommeExacte)

    containerRectangle1.textRectangle.text = tabReponses[0]
    containerRectangle2.textRectangle.text = tabReponses[1]
    containerRectangle3.textRectangle.text = tabReponses[2]

    containerRectangle1.addEventListener('click', (e) => {
        if(parseInt(containerRectangle1.textRectangle.text) == sommeExacte){
            alert("Gagné!")
        }
        else{
            alert("Perdu!")
        }
    })

    containerRectangle2.addEventListener('click', (e) => {
        if(parseInt(containerRectangle2.textRectangle.text) == sommeExacte){
            alert("Gagné!")
        }
        else{

            alert("Perdu!")
        }
    })

    containerRectangle3.addEventListener('click', (e) => {
        if(parseInt(containerRectangle3.textRectangle.text) == sommeExacte){
            alert("Gagné!")
        }
        else{
            alert("Perdu!")
        }
    })
}

function initReponses(tab,sol){
    let delta = Math.floor(sol*.15)
    let min = sol - delta
    let max = sol + delta

    let isol = getRandomIntInclusive(0, 2)

    let l = tab.length
    let i = 0
    let nombre = 0

    while (i<l) {
        if(i == isol){
            tab[i] = sol
            i += 1
        }
        else{
            nombre = getRandomIntInclusive(min, max)
            if(tab.indexOf(nombre) == -1){
                tab[i] = nombre
                i += 1
            }
        }
    }
}

function initTabNombres(tab,min,max){
    let l = tab.length
    let i = 0
    let nombre = 0

    while (i<l) {
        nombre = getRandomIntInclusive(min, max)
        if(tab.indexOf(nombre) == -1){
            tab[i] = nombre
            i += 1
        }
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}
