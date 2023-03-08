window.addEventListener('load', main)

let tabCases = document.querySelectorAll(".case")
let tabLignes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
let nbCliques = 0

function main(){
    for(let index in tabCases){
        tabCases[index].addEventListener("click",(e)=>{
            if(e.currentTarget.textContent === ""){
                if(nbCliques%2===0) e.currentTarget.textContent = "X"
                else e.currentTarget.textContent = "O"
                e.currentTarget.classList.remove("bgcolor")
                nbCliques += 1
                if(nbCliques>4) verification()
            }
        })
    }    
}

function verification() {
    let ligne

    for(let i in tabLignes){
        ligne = ""
        for(let j in tabLignes[i]) ligne += tabCases[tabLignes[i][j]].textContent
        if((ligne === "XXX")||(ligne === "OOO")) afficheLigneGagnante(i)     
    }
}

function afficheLigneGagnante(i){
    for(let j in tabLignes[i]) tabCases[tabLignes[i][j]].style.backgroundColor = "green"
}