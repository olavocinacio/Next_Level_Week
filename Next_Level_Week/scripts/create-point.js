//document.querySelector("form input") -> Seleciona o input de form,
//fetch() ->
//then() ->
//catch() ->
//arrow function (() =>) -> 

// document
//     .querySelector("select[name=uf]") //Seleciona o input uf
//     .addEventListener("change", () => { //Escuta as mudanças no inpu
//         console.log("mudei")
//     })

function populate_uf()
{
    let uf_select = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json() }) // = .then( res => res.json() )
    .then( states => {
        for(state of states)
        {
            uf_select.innerHTML += `<option value = ${state.id}>${state.nome}</option>`;
        }
    })
}

populate_uf();

function populate_cities(event) //event -> change do document.addEventListener -> seleção do estado
{ 
    let city_select = document.querySelector("select[name=city]")
    let stateInput = document.querySelector("input[name=state]")

    let uf_value = event.target.value //Iremos utilizar para pegar o id do estado e modificar a url da api das cidades
    
    let index_selected_state = event.target.selectedIndex //pega o index do estado selecionado
    stateInput.value = event.target.options[index_selected_state].text //troca o valor do input escondido para o nome do estado selecionado
    
    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf_value}/municipios`
    fetch(url)
    .then( (res) => {return res.json() }) // = .then( res => res.json() )
    .then( cities => {
        for(city of cities)
        {
            city_select.innerHTML += `<option value = ${city.id}>${city.nome}</option>`;
        }
        city_select.disabled = false //Habilitar seletor da cidade
    })
}




document
    .querySelector("select[name=uf]")
    .addEventListener("change", populate_cities)  
