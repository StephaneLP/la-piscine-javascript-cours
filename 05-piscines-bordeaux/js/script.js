document.querySelector(".btn").addEventListener ("click", (e) => {
    fetchData()
})

async function fetchData() {
    try {
        const response = await fetch("https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=bor_frequentation_piscine_tr&q=")

        if(!response.ok) {
            throw new Error(`Erreur: ${response.status}`)
        }

        const data = await response.json()

        displayData(data)

    }
    catch(error){
        errMsg.textContent = `${error}`
        console.log(error)
    }
}

function displayData(data) {
    let piscines = document.querySelectorAll(".res-piscine")
    let nomPiscine, lieuPiscine, nbNageurs, capacitePiscine

    data.records.sort((a,b)=>{
        if(a.fields.etablissement_etalib > b.fields.etablissement_etalib){
            return 1
        }
        else{
            return -1
        }
    })
    
    for(let i in data.records){
        nomPiscine = data.records[i].fields.etablissement_etalib
        lieuPiscine = data.records[i].fields.fmizonlib
        nbNageurs = data.records[i].fields.fmicourante
        capacitePiscine = data.records[i].fields.fmizonmax

        piscines[i].childNodes[1].textContent = nomPiscine + " (" + lieuPiscine + ")"
        piscines[i].childNodes[3].textContent = nbNageurs + "/" + capacitePiscine
        piscines[i].childNodes[5].value = nbNageurs
        piscines[i].childNodes[5].max = capacitePiscine
    }    
}