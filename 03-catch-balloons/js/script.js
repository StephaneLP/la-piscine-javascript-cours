window.addEventListener('load', init)

let descriptionfigures = [
    {
        x: 150, y: 250, diametre: 70, color: "darkgreen",
    },
    {
        x: 300, y: 150, diametre: 70, color: "darkblue",          
    },
    {
        x: 1000, y: 250, diametre: 70, color: "blue",         
    },
     {
        x: 500, y: 600, diametre: 70, color: "orange",
    },
    {
        x: 800, y: 300, diametre: 70, color: "lightgreen",
    },
    {
        x: 500, y: 400, diametre: 70, color: "lightblue",
    },
    {
        x: 200, y: 420, diametre: 70, color: "yellow",
    },
    {
       x: 780, y: 550, diametre: 70, color: "green",
    },
]

let stage
let shapes = []
let time = 600
let goGame = false
let nbBallonsRestants

function init() {
    let canvas = document.querySelector('.myCanvas')
    stage = new createjs.Stage(canvas)

    for(let i in descriptionfigures){
        createFigure(descriptionfigures[i])
    }

    nbBallonsRestants = descriptionfigures.length

    let tempsRestant
    createjs.Ticker.timingMode = createjs.Ticker.RAF
    createjs.Ticker.addEventListener("tick", () => {
        if(time%60==0){
            tempsRestant = time/60
            document.querySelector("#timer").textContent = tempsRestant.toString() + "s"
        }
        if(goGame){
            time -= 1;
            if(nbBallonsRestants==0){
                document.getElementById("resultat").innerText = "Gagné !"
                document.getElementById("resultat").style.display = "block"
                goGame = false
           }
            else if(time==0){
                document.getElementById("resultat").innerText = "Perdu !"
                document.getElementById("resultat").style.display = "block"
                goGame = false
            }
            animate();
        }

        stage.update();
    })
}

function raz() {
    nbBallonsRestants = descriptionfigures.length
    goGame = false
    time = 600
    for(let index in shapes){
        shapes[index].x = descriptionfigures[index].x
        shapes[index].y = descriptionfigures[index].y
    }
    stage.update();
}

function Game() {
    raz()
    if(!goGame){
        for(let i in shapes){
            shapes[i].animation = true
        } 
        goGame = true      
    }
    else{
        for(let i in shapes){
            shapes[i].animation = false
        }  

    }
    document.getElementById("resultat").style.display = "none"
}

function createFigure(descriptionfigures) {
    let figure = new createjs.Shape()

    figure.x = descriptionfigures.x
    figure.y = descriptionfigures.y
    figure.diametre = descriptionfigures.diametre
    figure.color = descriptionfigures.color

    figure.animation = false
    figure.direction = getRandomIntInclusive(1,4)
    figure.vitesse = 5
    figure.clique = false

    figure.graphics.beginFill(figure.color).drawCircle(0, 0, figure.diametre)
    figure.description = "Disque de couleur " + figure.color
 
    shapes.push(figure)
    stage.addChild(figure)

    figure.addEventListener("mousedown", (event) => {
        nbBallonsRestants -= 1
        event.currentTarget.clique = true
    })
}

function animate(){
    for(let i in shapes){
        if(shapes[i].animation){
            let posx, posy, val, direction

            posx = shapes[i].x - shapes[i].diametre
            posy = shapes[i].y - shapes[i].diametre
            val = shapes[i].diametre*2

            if(shapes[i].clique){
                shapes[i].vitesse += 10
            }
            else{
                direction = shapes[i].direction
                if(posx < 0){
                    direction = (direction == 3 ? 1 : 2)
                }
                if(posy < 0){
                    direction = (direction == 2 ? 1 : 3)
                }
                if(posx > 1200 - val){
                    direction = (direction == 1 ? 3 : 4)
                }
                if(posy > 700 - val){
                    direction = (direction == 1 ? 2 : 4)
                }
                shapes[i].direction = direction                
            }

            switch(shapes[i].direction){
                case 1:
                    shapes[i].x += shapes[i].vitesse
                    shapes[i].y += shapes[i].vitesse
                    break;
                case 2:
                    shapes[i].x += shapes[i].vitesse
                    shapes[i].y += shapes[i].vitesse*(-1)
                break;
                case 3:
                    shapes[i].x += shapes[i].vitesse*(-1)
                    shapes[i].y += shapes[i].vitesse
                    break;
                case 4:

                    shapes[i].x += shapes[i].vitesse*(-1)
                    shapes[i].y += shapes[i].vitesse*(-1)
                    break;
            }           
        }
    }
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
  }
  