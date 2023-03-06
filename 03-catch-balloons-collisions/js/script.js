window.addEventListener('load', init)

let descriptionfigures = [
    {
        x: 150, y: 250, rayon: 70, color: "darkgrey",
    },
    {
        x: 300, y: 150, rayon: 70, color: "darkblue",          
    },
    {
        x: 1000, y: 250, rayon: 70, color: "blue",         
    },
     {
        x: 500, y: 600, rayon: 70, color: "orange",
    },
    {
        x: 800, y: 300, rayon: 70, color: "lightgreen",
    },
    {
        x: 500, y: 400, rayon: 70, color: "lightblue",
    },
    {
        x: 200, y: 420, rayon: 70, color: "yellow",
    },
    {
       x: 780, y: 550, rayon: 70, color: "green",
    },
    {
        x: 600, y: 120, rayon: 70, color: "brown",
    },
    {
       x: 1050, y: 550, rayon: 70, color: "grey",
    },
]

let stage
let shapes = []
let time = 600
let goGame = false
let nbBallonsRestants
let blnAnimation = false

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
        blnAnimation = true
        goGame = true      
    }
    document.getElementById("resultat").style.display = "none"
}

function createFigure(descriptionfigures) {
    let figure = new createjs.Shape()

    figure.x = descriptionfigures.x
    figure.y = descriptionfigures.y
    figure.rayon = descriptionfigures.rayon
    figure.color = descriptionfigures.color

    // figure.animation = false
    figure.direction = getRandomIntInclusive(1,4)
    figure.dirx = Math.pow(-1,getRandomIntInclusive(1,2))
    figure.diry = Math.pow(-1,getRandomIntInclusive(1,2))
    figure.vitesse = 5
    figure.clique = false

    figure.graphics.beginFill(figure.color).drawCircle(0, 0, figure.rayon)
    figure.description = "Disque de couleur " + figure.color
 
    shapes.push(figure)
    stage.addChild(figure)

    figure.addEventListener("mousedown", (event) => {
        nbBallonsRestants -= 1
        event.currentTarget.clique = true
    })
}

function animate(){
    if(blnAnimation){
        for(let i in shapes){
            let posx, posy, rayon, diametre, distance

            if(shapes[i].clique){
                shapes[i].vitesse += 10
            }
            else{
                posx = shapes[i].x
                posy = shapes[i].y
                rayon =  shapes[i].rayon
                diametre = shapes[i].rayon*2

                for(let j in shapes){
                    if((shapes[j].x!=shapes[i].x)&&(shapes[j].y!=shapes[i].y)){
                        distance = calculDistance(shapes[i],shapes[j])
                        if(distance <= diametre){   
                            shapes[i].dirx = shapes[i].dirx*(-1)
                            shapes[i].diry = shapes[i].diry*(-1)                            
                        }
                    }                
                }

                if((posx < rayon)||(posx > 1200 - rayon)) shapes[i].dirx = shapes[i].dirx*(-1)
                if((posy < rayon)||(posy > 700 - rayon)) shapes[i].diry = shapes[i].diry*(-1)
            }

            shapes[i].x += shapes[i].vitesse*shapes[i].dirx
            shapes[i].y += shapes[i].vitesse*shapes[i].diry          
        }
    }
}

function calculDistance(circle1,circle2){
    let dx, dy, hypothnuse
    dx = circle2.x - circle1.x
    dy = circle2.y - circle1.y
    hypothnuse = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))
    return Math.floor(hypothnuse)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
  }
  