document.getElementById('search-btn').addEventListener('click', function () {
    const searchMeal = document.getElementById('search-meal').value;
    if (searchMeal === '') {
        return alert('Enter something to search!!');
    };
    displayLoader(true);
    loadMeals(searchMeal);
})

const loadMeals = async (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMeals(data.meals);
}

const displayMeals = meals => {
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';

    const noMealMessage = document.getElementById('no-meal-message');
    if (meals === null) {
        noMealMessage.classList.remove('hidden');
    } else {
        noMealMessage.classList.add('hidden');
    }

    try {
        meals.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.classList.add('bg-white', 'rounded-lg', 'border', 'border-gray-200', 'shadow-md', 'flex', 'flex-col', 'justify-between');
            mealDiv.innerHTML = `
            <div>
                <img class="rounded-t-lg" src="${meal.strMealThumb}" alt="">
                <div class="p-2 md:pt-5 md:px-5">
                    <h5 class="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900">${meal.strMeal}</h5>
                    <p class="mb-2 text-gray-700"><span class="font-medium">Category:</span> ${meal.strCategory ? meal.strCategory : 'No Category'}</p>
                    <p class="mb-3 text-gray-700"><span class="font-medium">Tags:</span> ${showTags(meal.strTags)}</p>
                </div>
            </div>
            <div class="p-2 pb-5 md:px-5">
                <label onclick="openModalMealDetails('${meal.idMeal}')" for="displayMealDetail" class="modal-button text-white bg-emerald-700 hover:bg-emerald-600 focus:outline-none font-medium rounded-lg text-sm px-3 py-2.5 text-center cursor-pointer">Instructions</label>

            </div>
            `
            mealsContainer.appendChild(mealDiv);
        });

        function showTags(tags) {
            if (tags === '' || tags === null) {
                return 'No Tags';
            }
            const split = tags.split(',');
            const join = split.join(', ');
            return join;
        }
    } catch (error) {
        console.log(error);
    }

    displayLoader(false);
}

const openModalMealDetails = async (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalMealDetails(data.meals[0])
}

const displayModalMealDetails = meal => {
    const modalContainer = document.getElementById('modal-container');

    modalContainer.innerHTML = `
    <label for="displayMealDetail" class="btn btn-sm btn-circle absolute right-3 top-3">✕</label>
    <h3 class="text-lg font-bold">${meal.strMeal}</h3>
    <p class="py-4"><span class="font-medium">Instructions:</span> ${meal.strInstructions}</p>
    `
    console.log(meal);
}

const displayLoader = isTrue => {
    const loader = document.getElementById('loader');
    if (isTrue) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}