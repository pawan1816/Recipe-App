const searchBtn=document.querySelector(".searchButton");
const searchBox=document.querySelector(".search-Box");
const recipeContainer=document.querySelector(".recipe-container");
const recipeCloseBtn=document.querySelector(".recipe-close-btn");
const recipeDetailsContent=document.querySelector(".recipe-details-containt");


//function to get recipe
const featchRecipe= async (query)=>{
    recipeContainer.innerHTML="<h2>fetching Recipes...</h2>";
    try{

    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response= await data.json();

    recipeContainer.innerHTML="";
    response.meals.forEach(element => {
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`<img src="${element.strMealThumb}">
        <h3>${element.strMeal}</h3>
        <p><span>${element.strArea}</span> Dish</p>
        <p>Belongs to <span>${element.strCatagory}</span></p>
        `
        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);
        // console.log(element);
        // Adding addEventListener to recipe button
        button.addEventListener('click',()=>{
            openRecipePopup(element);
        });
        recipeContainer.appendChild(recipeDiv);
    });
    }catch(error){
        recipeContainer.innerHTML="<h2>No Recipy as per the name in the data</h2>";
    }
}
// function to fetch Ingredients and measurement
const fetchIngredients=(meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientsList+=`<li>${measure} ${ingredient}</li>`;
        }
        else{
            break;
        }
    }
    return ingredientsList;
}
const openRecipePopup=(element)=>{
       recipeDetailsContent.innerHTML=`
       <h2 class="recipeName">${element.strMeal}</h2>
       <h3>Igredents:</h3>
       <ul class="ingredientList">${fetchIngredients(element)}</ul>
       <div class="recipeInstruction">
          <h3>Instructions:</h3>
          <p >${element.strInstructions}</p>
       </div>
       `
       
       recipeDetailsContent.parentElement.style.display="block";
}

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box.</h2>`;
        return;
    }
    featchRecipe(searchInput);
    console.log("button clicked");
});

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
});