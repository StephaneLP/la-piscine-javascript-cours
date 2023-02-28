window.addEventListener('load', init)

let stage
let shapes = []
let descriptionfigures = [
    {
        type: "Circle", x: 500, y: 400, diametre: 50, width: null, height: null, color: "lightblue",
    },
    {
        type: "Circle", x: 800, y: 300, diametre: 60, width: null, height: null, color: "lightgreen",
    },
    {
        type: "Circle", x: 500, y: 600, diametre: 70, width: null, height: null, color: "orange",
    },
    {
        type: "Circle", x: 1000, y: 250, diametre: 80, width: null, height: null, color: "blue",         
    },
    {
        type: "Circle", x: 400, y: 250, diametre: 80, width: null, height: null, color: "darkblue",          
    },
    {
        type: "Rectangle", x: 520, y: 250, diametre: null, width: 80, height: 50, color: "darkgreen",
    },
    {
        type: "Rectangle", x: 780, y: 550, diametre: null, width: 50, height: 20, color: "green",
    },
    {
        type: "Rectangle", x: 200, y: 420, diametre: null, width: 200, height: 100, color: "yellow",
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
        animate();
        stage.update();
    })
}

function createFigure(descriptionfigures) {
    let figure = new createjs.Shape();

    figure.type = descriptionfigures.type;
    figure.x = descriptionfigures.x;
    figure.y = descriptionfigures.y;
    figure.diametre = descriptionfigures.diametre;
    figure.width = descriptionfigures.width;
    figure.height = descriptionfigures.height;
    figure.color = descriptionfigures.color;

    figure.animation = true;
    figure.direction = getRandomIntInclusive(1,4);
    figure.valdir = -3;

    switch (figure.type) {
        case "Circle":
            figure.graphics.beginFill(figure.color).drawCircle(0, 0, figure.diametre);
            figure.description = "Disque de couleur " + figure.color;
            break;
        case "Rectangle":
            figure.graphics.beginFill(figure.color).drawRect(0, 0, figure.width, figure.height);
            figure.description = "Rectangle de couleur " + figure.color;
            break;
    }   

    shapes.push(figure)
    stage.addChild(figure);

    figure.addEventListener("click", (event) => {
        event.currentTarget.animation = !event.currentTarget.animation
    })
}

function animate(){
    for(let i in shapes){
        if(shapes[i].animation){
            let posx, posy, valx, valy, changeDirection;

            if(shapes[i].type=="Rectangle"){
                posx = shapes[i].x
                posy = shapes[i].y
                valx = shapes[i].width
                valy = shapes[i].height
            }
            if(shapes[i].type=="Circle"){
                posx = shapes[i].x - shapes[i].diametre
                posy = shapes[i].y - shapes[i].diametre
                valx = shapes[i].diametre*2
                valy = valx
            }
            changeDirection = ((posx < 0)||(posx > 1200 - valx)||(posy < 0)||(posy > 800 - valy))

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
  