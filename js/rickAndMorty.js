const index = Math.floor(Math.random() * 126) + 1

const apiRick = async () => {
    let url = `https://rickandmortyapi.com/api/location/${index}`
    const api = await fetch(url);
    const data = await api.json();
    console.log(data)
    divRes = document.querySelector("#resultado")
    data.residents.map(url => {
        getResidents(url)
    })

}

apiRick();


const getResidents = async (url) => {
    const api = await fetch(url);
    const data = await api.json();
    console.log(data)
    divItem = document.getElementById(`app`)
    divItem.innerHTML = `
    <div class="card">
        <h3 class="card-title">
            Name: ${data.name}
        </h3>
        <img src="${data.image}" class="card-img-rick" alt="Api-imagen">
        <p class="card-text">Species: ${data.species}</p>
        <p class="card-text">Location: ${data.location.name}</p>
        <p class="card-text">Status: ${data.status}</p>
        <p class="card-text">Gender: ${data.gender}</p>
        <p class="card-text">Id: ${data.id}</p>
        <button class="buttom-rick"><i class='bx bx-transfer-alt'></i></button>
  </div>
        
        
        `
}
/*
<div class="card"  ">
        <h3 class="card-title">
            nombre: ${data.name}
        </h3>
        <img src="${data.image}" class="card-img-top" alt="">
        <p class="card-text"></p>
        </div>
        <div class="card"  ">
        <h3 class="card-title">
            nombre: ${data.name}
        </h3>
        <img src="${data.image}" class="card-img-top" alt="">
        <p class="card-text"></p>
        </div>
        
fetch(`https://rickandmortyapi.com/api/location/${index}`)
    .then((res) => res.json())
    .then(dataRick => {
        console.log(dataRick)
    })
    .catch(error => console.log(error))

const charaters = () => {
    fetch(`https://rickandmortyapi.com/api/character/${index}`)
        .then(residents => residents.json())
        .then(res => {
            console.log(res)
        })
}


const body = document.body
const contenedor = document.getElementById("app");
function getResidents() {

    let fragment = ""
    cartProducts.forEach(charaters => {
        fragment += `

        <div class="card" style="width: 12rem;">
        <h3 class="card-title">
            nombre: 
        </h3>
        <img src="${item}" class="card-img-top" alt="">
        <p class="card-text"></p>
        </div>



    `
    })
    contenedor.innerHTML = fragment
}
*/