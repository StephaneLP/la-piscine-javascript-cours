let tabCases = document.querySelectorAll(".case")
let nbCliques = 0

for(let index in tabCases){
    tabCases[index].addEventListener("click",(e)=>{
        if(e.currentTarget.textContent === ""){
            if(nbCliques%2===0){
                e.currentTarget.textContent = "X"
            }
            else{
                e.currentTarget.textContent = "O"
            }
            e.currentTarget.classList.remove("bgcolor")
            nbCliques += 1
            if(nbCliques>4) verification()
        }
    })
}

function verification() {
    let tabTest = []
    tabTest[0] = tabCases[0].textContent + tabCases[1].textContent + tabCases[2].textContent
    tabTest[1] = tabCases[3].textContent + tabCases[4].textContent + tabCases[5].textContent
    tabTest[2] = tabCases[6].textContent + tabCases[7].textContent + tabCases[8].textContent
    tabTest[3] = tabCases[0].textContent + tabCases[3].textContent + tabCases[6].textContent
    tabTest[4] = tabCases[1].textContent + tabCases[4].textContent + tabCases[7].textContent
    tabTest[5] = tabCases[2].textContent + tabCases[5].textContent + tabCases[8].textContent
    tabTest[6] = tabCases[0].textContent + tabCases[4].textContent + tabCases[8].textContent
    tabTest[7] = tabCases[2].textContent + tabCases[4].textContent + tabCases[6].textContent

    for(let index in tabTest){
        console.log(tabTest[index])
        if(tabTest[index] === "XXX"){
            afficheLigneGagnante(index)
        }
        if(tabTest[index] === "OOO"){
            alert("Vainqueur : joueur 2")
        }
    }
}

function afficheLigneGagnante(i){
    switch(i) {
        case "0":
            tabCases[0].style.backgroundColor = "green"
            tabCases[1].style.backgroundColor = "green"
            tabCases[2].style.backgroundColor = "green"
            break
        case 1:
            tabCases[3].style.backgroundColor = "green"
            tabCases[4].style.backgroundColor = "green"
            tabCases[5].style.backgroundColor = "green"
            break
        case 2:
            tabCases[6].style.backgroundColor = "green"
            tabCases[7].style.backgroundColor = "green"
            tabCases[8].style.backgroundColor = "green"
            break
        case 3:
            tabCases[0].style.backgroundColor = "green"
            tabCases[3].style.backgroundColor = "green"
            tabCases[6].style.backgroundColor = "green"
            break
        case 4:
            tabCases[1].style.backgroundColor = "green"
            tabCases[4].style.backgroundColor = "green"
            tabCases[7].style.backgroundColor = "green"
            break
        case 5:
            tabCases[2].style.backgroundColor = "green"
            tabCases[5].style.backgroundColor = "green"
            tabCases[8].style.backgroundColor = "green"
            break
        case "6":
            tabCases[0].style.backgroundColor = "green"
            tabCases[4].style.backgroundColor = "green"
            tabCases[8].style.backgroundColor = "green"
            break
        case 7:
            tabCases[2].style.backgroundColor = "green"
            tabCases[4].style.backgroundColor = "green"
            tabCases[6].style.backgroundColor = "green"
            break
        }
}