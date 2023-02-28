window.addEventListener('load', init)

let stage
let shapes = []
let time = 1200
let goGame = false
let nombreFigures
let descriptionfigures = [
    {
        x: 520, y: 250, diametre: 100, color: "darkgreen",
    },
    {
        x: 400, y: 250, diametre: 90, color: "darkblue",          
    },
    {
        x: 1000, y: 250, diametre: 80, color: "blue",         
    },
     {
        x: 500, y: 600, diametre: 70, color: "orange",
    },
    {
        x: 800, y: 300, diametre: 60, color: "lightgreen",
    },
    {
        x: 500, y: 400, diametre: 50, color: "lightblue",
    },
    {
        x: 200, y: 420, diametre: 40, color: "yellow",
    },
    {
       x: 780, y: 550, diametre: 30, color: "green",
    },
]

function init() {
    nombreFigures = descriptionfigures.length
    let canvas = document.querySelector('.myCanvas');
    stage = new createjs.Stage(canvas);
    let tempsRestant

    for(let i in descriptionfigures){
        createFigure(descriptionfigures[i])
    }

    createjs.Ticker.timingMode = createjs.Ticker.RAF
    createjs.Ticker.addEventListener("tick", () => {
        if(time%60==0){
            tempsRestant = time/60
            document.querySelector("#timer").textContent = tempsRestant.toString() + "s"
        }
        if(goGame){
            time -= 1;
            if(nombreFigures==0){
                document.getElementById("resultat").innerText = "Gagné !"
                document.getElementById("resultat").style.display = "block";
                goGame = false
            }
            else if(time==0){
                document.getElementById("resultat").innerText = "Perdu !"
                document.getElementById("resultat").style.display = "block";
                goGame = false
            }
            animate();
        }

        stage.update();
    })
}

function createFigure(descriptionfigures) {
    let figure = new createjs.Shape();

    figure.x = descriptionfigures.x;
    figure.y = descriptionfigures.y;
    figure.diametre = descriptionfigures.diametre;
    figure.color = descriptionfigures.color;

    figure.animation = false;
    figure.direction = getRandomIntInclusive(1,4);
    figure.valdir = 4;
    figure.clique = false;

    figure.graphics.beginFill(figure.color).drawCircle(0, 0, figure.diametre);
    figure.description = "Disque de couleur " + figure.color;
 
    shapes.push(figure)
    stage.addChild(figure);

    figure.addEventListener("click", (event) => {
        nombreFigures -= 1
        event.currentTarget.clique = true
    })
}

function animate(){
    for(let i in shapes){
        if(shapes[i].animation){
            let posx, posy, val, changeDirection;

            posx = shapes[i].x - shapes[i].diametre
            posy = shapes[i].y - shapes[i].diametre
            val = shapes[i].diametre*2
            changeDirection = ((posx < 0)||(posx > 1200 - val)||(posy < 0)||(posy > 700 - val))

            switch(shapes[i].direction){
                case 1:
                    if(shapes[i].clique){
                        shapes[i].valdir += 10
                    }
                    else if(changeDirection){
                        shapes[i].valdir = shapes[i].valdir*(-1)
                        shapes[i].direction = getRandomIntInclusive(1,4)
                    }
                    shapes[i].y += shapes[i].valdir;
                    break;
                case 2:
                    if(shapes[i].clique){
                        shapes[i].valdir += 10
                    }
                    else if(changeDirection){
                        shapes[i].valdir = shapes[i].valdir*(-1)
                        shapes[i].direction = getRandomIntInclusive(1,4)
                    }
                    shapes[i].x += shapes[i].valdir;
                    break;
                case 3:
                    if(shapes[i].clique){
                        shapes[i].valdir += 10
                    }
                    else if(changeDirection){
                        shapes[i].valdir = shapes[i].valdir*(-1)
                        shapes[i].direction = getRandomIntInclusive(1,4)
                    }
                    shapes[i].x += shapes[i].valdir;
                    shapes[i].y += shapes[i].valdir;
                    break;
                case 4:
                    if(shapes[i].clique){
                        shapes[i].valdir += 10
                    }
                    else if(changeDirection){
                        shapes[i].valdir = shapes[i].valdir*(-1)
                        shapes[i].direction = getRandomIntInclusive(1,4)
                    }
                    shapes[i].x += shapes[i].valdir;
                    shapes[i].y += shapes[i].valdir*(-1);
                    break;
            }                
        }
    }
}

function go(){
    // init()
    if(!goGame){
        for(let i in shapes){
            shapes[i].animation = true;
        } 
        goGame = true      
    }
    else{
        for(let i in shapes){
            shapes[i].animation = false;
        }  
        document.getElementById("resultat").style.display = "none";
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }
  