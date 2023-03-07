let tabCases = document.querySelectorAll(".case")
let nbCliques = 0

for(let index in tabCases){
    tabCases[index].addEventListener("click",(e)=>{
        if(tabCases[index].textContent === ""){
            if(nbCliques%2===0){
                tabCases[index].textContent = "X"
            }
            else{
                tabCases[index].textContent = "O"
            }
            tabCases[index].style.backgroundColor = "#fdfdfd"
            nbCliques += 1
        }
    })
}