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

        let piscines = document.querySelectorAll(".res-piscine")
        for(let i in data.records){
            piscines[i].childNodes[1].textContent = data.records[i].fields.etablissement_etalib
            piscines[i].childNodes[3].textContent = data.records[i].fields.fmizonnum + "/" + data.records[i].fields.fmizonmax
            piscines[i].childNodes[5].value = data.records[i].fields.fmizonnum
            piscines[i].childNodes[5].max = data.records[i].fields.fmizonmax
        }

    }
    catch(error){
        console.log("Erreur")
    }
}