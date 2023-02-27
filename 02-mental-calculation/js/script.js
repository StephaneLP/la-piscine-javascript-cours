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
        type: "Circle", x: 400, y: 250, diametre: 80, width: null, height: null, color: "blue",          
    },
    {
        type: "Rectangle", x: 520, y: 250, diametre: null, width: 80, height: 50, color: "darkgreen",
    },
    {
        type: "Rectangle", x: 780, y: 550, diametre: null, width: 50, height: 20, color: "darkgreen",
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
        raz();
        stage.update();
    })
}

function animate(){
    for(let i in shapes){
        if(shapes[i].animation){
            switch(shapes[i].direction){
                case 0:
                    shapes[i].y += shapes[i].valdir;
                    break;
                case 1:
                    shapes[i].x += shapes[i].valdir;
                    break;
                case 2:
                    shapes[i].x += shapes[i].valdir;
                    shapes[i].y += shapes[i].valdir;
                    break;
                case 3:
                    shapes[i].x += shapes[i].valdir;
                    shapes[i].y += shapes[i].valdir*(-1);
                    break;
            }
        }
    }
}

function raz(){
    let valx, valy;

    for(let i in shapes){
        if(shapes[i].type=="Rectangle"){
            valx = shapes[i].w
            valy = shapes[i].h
        }
        if(shapes[i].type=="Circle"){
            valx = shapes[i].d
            valy = shapes[i].d
        }

        if((shapes[i].x < 0)||(shapes[i].x > 1200 - valx)||(shapes[i].y < valy)||(shapes[i].y > 800 - valy)){
            // shapes[i].x = 600;
            // shapes[i].y = 400;
            // shapes[i].direction = getRandomInt(4);
            shapes[i].valdir = shapes[i].valdir*(-1)
        }
    }
}

function createFigure(descriptionfigures) {
    let type = descriptionfigures.type
    let x = descriptionfigures.x
    let y = descriptionfigures.y
    let d = descriptionfigures.diametre
    let w = descriptionfigures.width
    let h = descriptionfigures.height
    let color = descriptionfigures.color

    let figure = new createjs.Shape();
    shapes.push(figure)

    switch (type) {
        case "Circle":
            figure.graphics.beginFill(color).drawCircle(0, 0, d);
            figure.description = "Disque de couleur " + color;
            break;
        case "Rectangle":
            figure.graphics.beginFill(color).drawRect(0, 0, w, h);
            figure.description = "Rectangle de couleur " + color;
            break;
    }   

    figure.x = x;
    figure.y = y;
    figure.type = type;
    figure.x = x;
    figure.y = y;
    figure.d = d;
    figure.animation = true;
    figure.direction = getRandomInt(4);
    figure.valdir = -3;

    stage.addChild(figure);

    // figure.addEventListener("click", (event) => {
    //     event.currentTarget.animation = true
    //     event.currentTarget.direction = getRandomInt(4)
    //     event.currentTarget.valdir = event.currentTarget.valdir*(-1)
    // })
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}