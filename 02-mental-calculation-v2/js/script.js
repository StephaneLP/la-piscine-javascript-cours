window.addEventListener('load', init)

let stage
let shapes = []
let time = 1200
let descriptionfigures = [
    {
        x: 500, y: 400, diametre: 50, color: "lightblue",
    },
    {
        x: 800, y: 300, diametre: 60, color: "lightgreen",
    },
    {
        x: 500, y: 600, diametre: 70, color: "orange",
    },
    {
        x: 1000, y: 250, diametre: 80, color: "blue",         
    },
    {
        x: 400, y: 250, diametre: 80, color: "darkblue",          
    },
    {
        x: 520, y: 250, diametre: 100, color: "darkgreen",
    },
    {
       x: 780, y: 550, diametre: 30, color: "green",
    },
    {
        x: 200, y: 420, diametre: 150, color: "yellow",
    }
]

function init() {
    let canvas = document.querySelector('.myCanvas');
    stage = new createjs.Stage(canvas);

    for(let i in descriptionfigures){
        createFigure(descriptionfigures[i])
    }

    createjs.Ticker.timingMode = createjs.Ticker.RAF
    createjs.Ticker.addEventListener("tick", () => {
        time -= 1;
        if(time==0){
            alert("Perdu !")
        }
        animate();
        stage.update();
    })
}

function createFigure(descriptionfigures) {
    let figure = new createjs.Shape();

    figure.x = descriptionfigures.x;
    figure.y = descriptionfigures.y;
    figure.diametre = descriptionfigures.diametre;
    figure.color = descriptionfigures.color;

    figure.animation = true;
    figure.direction = getRandomIntInclusive(1,4);
    figure.valdir = -3;

    figure.graphics.beginFill(figure.color).drawCircle(0, 0, figure.diametre);
    figure.description = "Disque de couleur " + figure.color;
 
    shapes.push(figure)
    stage.addChild(figure);

    figure.addEventListener("click", (event) => {
        event.currentTarget.animation = !event.currentTarget.animation
    })
}

function animate(){
    for(let i in shapes){
        if(shapes[i].animation){
            let posx, posy, val, changeDirection;

            posx = shapes[i].x - shapes[i].diametre
            posy = shapes[i].y - shapes[i].diametre
            val = shapes[i].diametre*2
            changeDirection = ((posx < 0)||(posx > 1200 - val)||(posy < 0)||(posy > 800 - val))

            switch(shapes[i].direction){
                case 1:
                    if(changeDirection){
                        shapes[i].valdir = shapes[i].valdir*(-1)
                        shapes[i].direction = getRandomIntInclusive(1,4)
                    }
                    shapes[i].y += shapes[i].valdir;
                    break;
                case 2:
                   if(changeDirection){
                        shapes[i].valdir = shapes[i].valdir*(-1)
                        shapes[i].direction = getRandomIntInclusive(1,4)
                    }
                    shapes[i].x += shapes[i].valdir;
                    break;
                case 3:
                    if(changeDirection){
                        shapes[i].valdir = shapes[i].valdir*(-1)
                        shapes[i].direction = getRandomIntInclusive(1,4)
                    }
                    shapes[i].x += shapes[i].valdir;
                    shapes[i].y += shapes[i].valdir;
                    break;
                case 4:
                    if(changeDirection){
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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }
  