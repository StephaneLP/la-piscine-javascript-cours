// exo 1

let listeExo1 = document.querySelectorAll(".btn-exo1")

for(let i=0; i<listeExo1.length; i++){
    listeExo1[i].addEventListener("click",(e)=>{
        document.querySelector("#res-exo1").style.backgroundColor = e.currentTarget.textContent
    })
}

// exo 2

document.querySelector(".btn-exo2").addEventListener("click",(e)=>{
    document.querySelector("#res-exo2").textContent = document.querySelector("#input-exo1").value
})

// exo 3

document.querySelector("#input-exo3").addEventListener("change",(e)=>{
    document.querySelector("#res-exo3").textContent = e.currentTarget.value
})

// exo 4

document.querySelector("#input-exo4").addEventListener("input",(e)=>{
    document.querySelector("#res-exo4").textContent =e.currentTarget.value
})

// exo 5

document.querySelector("#input-exo5").addEventListener("input",(e)=>{
    document.querySelector("#res-exo5").textContent = e.currentTarget.value
})

// exo 6

document.querySelector("#select-languages").addEventListener("change",(e)=>{
    document.querySelector("#res-exo6").textContent = e.currentTarget.value
})

// exo 7

document.querySelector("#color-exo7").addEventListener("input",(e)=>{
    document.querySelector("#res-exo7").style.backgroundColor = e.currentTarget.value
})

// exo 8

let btnsExo8 = document.querySelectorAll(".btn-exo8")
let tabCouleurs =["blue","brown","grey"]
for(let i=0; i<btnsExo8.length; i++){
    btnsExo8[i].addEventListener("click",(e)=>{
        document.querySelector("#res-exo8").style.backgroundColor = tabCouleurs[i]
    })
}

// exo 9

let checkboxExo9 = document.querySelectorAll(".checkboxExo9")
console.log(checkboxExo9)
for(let i=0; i<checkboxExo9.length; i++){
    checkboxExo9[i].addEventListener("change",(e)=>{
        document.querySelector("#res-exo9").textContent = majSpan()
    })
}

function majSpan(){
    let msg = ""
    for(let i=0; i<checkboxExo9.length; i++){
        if(checkboxExo9[i].checked){
            if(msg!="") msg += " - "
            msg += checkboxExo9[i].name
        }
    }
    return msg   
}