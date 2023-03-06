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
        msg = ""
        let nbcircles = circles.length
        for(let i=0; i<nbcircles; i++){
            let posx, posy, rayon, diametre, distance

            if(circles[i].clique){
                circles[i].vitesse += 10
            }
            else{
                posx = circles[i].x
                posy = circles[i].y
                rayon =  circles[i].rayon
                diametre = circles[i].rayon*2

                if(i<nbcircles-1){
                    for(let j=i+1; j<nbcircles; j++){
                        distance = calculDistance(circles[i],circles[j])
                        if(distance <= diametre){
                            nbcollisions += 1 
                            circles[i].dirx = circles[i].dirx*(-1)
                            circles[i].diry = circles[i].diry*(-1)         
                            circles[j].dirx = circles[j].dirx*(-1)
                            circles[j].diry = circles[j].diry*(-1)                                                
                        }
                    }                    
                }

                if((posx < rayon)||(posx > 1200 - rayon)) circles[i].dirx = circles[i].dirx*(-1)
                if((posy < rayon)||(posy > 700 - rayon)) circles[i].diry = circles[i].diry*(-1)
            }
       
            circles[i].x += circles[i].vitesse*circles[i].dirx
            circles[i].y += circles[i].vitesse*circles[i].diry          
        }
        if(msg!="") alert(msg)
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
  