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

    city_select.innerHTML = "<option value>Selecione a Cidade</option>"
    city_select.disabled = true

    fetch(url)
    .then( (res) => {return res.json() }) // = .then( res => res.json() )
    .then( cities => {
        for(city of cities)
        {
            city_select.innerHTML += `<option value = ${city.nome}>${city.nome}</option>`;
        }
        city_select.disabled = false //Habilitar seletor da cidade
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", populate_cities)  



//  Itens de coleta

let items_to_collect = document.querySelectorAll(".items-grid li") 

for (item of items_to_collect){
    item.addEventListener("click", handle_selected_item) //Identifica qual dos itens foi selecionado
}

const collected_items = document.querySelector("input[name=items]")//atribui os itens selecionados ao box hidden, adcionando os item ao url da págin

let selected_items = []

function handle_selected_item(event){
    let item_li = event.target
    item_li.classList.toggle("selected")//adciona ou remove a classe selected.
    let item_id = item_li.dataset.id

    let already_selected = selected_items.findIndex( item => { //Verifica se existe algum item selecionado
        let item_found = item == item_id //Item encontrado recebe item se o item for igual ao item_id
        return item_found //already_selected vai receber um booleano que diz se o item está selecionado ou não
    }) //Essa função relaciona os id do item selecionado ao index que ele recebe em selected_items

    //se já estiver selecionado
    if(already_selected >= 0){ //Se o item não estiver na lista, recebe -1. Se o item estiver na lista
        let filtered_items = selected_items.filter(item => {
            let item_is_different = item != item_id 
            return item_is_different
        })//Se o item já estiver selecionado, vai ser retirado do filtered_items
        selected_items = filtered_items
    }
    else{ //Se não estiver selecionado
        selected_items.push(item_id) //adciona o item ao selected_items
    }

    collected_items.value = selected_items
}
