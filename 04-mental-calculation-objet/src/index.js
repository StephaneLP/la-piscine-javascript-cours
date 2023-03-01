import main from "./main.js";

export default function init() {
    let myBtn = document.getElementById("div-resultat");
    let canvas = document.getElementById("demoCanvas");
    let stage = new createjs.Stage(canvas);

    main(stage);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", () => {
        stage.update();
    });

    myBtn.addEventListener()
}

window.addEventListener('load', init)

// function test(){
//     alert('ok')
//     document.getElementById("div-resultat").style.display = "none";
// }