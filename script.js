const url = "https://cocktails.solvro.pl/api/v1/cocktails"
let sufix = "/?page=1"
let alc = true
let alc_sufix = ''

function getCocktails(sufix){
    fetch(url + sufix + alc_sufix)
        .then(res => {
            return res.json();
        })
        .then(
            data => {
            document.querySelector('ul').innerHTML="";
            data.data.forEach(cocktail => {
                const markup = `<li onclick="getCocktailInfo(${cocktail.id})">${cocktail.name}`;
                document.querySelector('ul').insertAdjacentHTML('beforeend', markup)
            });
            document.getElementById('current_page').innerHTML = `<span style="font-weight: 400;">${data.meta.currentPage}</span> of ${data.meta.lastPage}`;
            document.getElementById('next_page').setAttribute("onclick", `getCocktails("${data.meta.nextPageUrl}")`);
            document.getElementById('previous_page').setAttribute("onclick", `getCocktails("${data.meta.previousPageUrl}")`);
        })
        .catch(error => console.log(error))
}

function getCocktailInfo(cocktail_id){
    fetch(url +"/"+ cocktail_id)
        .then(res => {
            return res.json();
        })
        .then(
            data => {
            ingredients = "";
            data.data.ingredients.forEach(ingredient => {
                ingredients += `<li><span style="font-weight: 400;">${ingredient.measure}</span>\t ${ingredient.name}</li>`;
                
            });
            let info_content = `
                <h2>${data.data.name}</h2> 
                <span class="additional_info">${data.data.category}</span>
                <img src="${data.data.imageUrl}" />
                <h3>Preparation:</h3>
                <p>${data.data.instructions}</p>
                <h3>Ingredients:</h3><ul>${ingredients}</ul>
                <span class="additional_info">Glass type:</span> ${data.data.glass}<br>
                <span class="additional_info">Contains alcohol: </span>${data.data.alcoholic}<br>
                `
            document.getElementById('info').innerHTML = info_content;
        })
        .catch(error => console.log(error))
}

function filter(param){
    if(param.trim()=="alc".trim()){
        if(alc==true){
            alc = false
            alc_sufix = '&alcoholic=false'

        }
        else{
            alc = true
            alc_sufix = ''
        }
    }
    getCocktails(sufix);
}

getCocktails(sufix);
