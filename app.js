document.getElementById('search-btn').addEventListener('click', function () {
    const searchMeal = document.getElementById('search-meal').value;
    loadMeals('cheese');
})

const loadMeals = async (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMeals(data.meals);
}

const displayMeals = meals => {
    const mealsContainer = document.getElementById('meals-container');

    meals.forEach(meal => {
        console.log(meal)
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('bg-white', 'rounded-lg', 'border', 'border-gray-200', 'shadow-md', 'flex', 'flex-col', 'justify-between');
        mealDiv.innerHTML = `
        <div>
            <img class="rounded-t-lg" src="${meal.strMealThumb}" alt="">
            <div class="px-5 pt-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${meal.strMeal}</h5>
                <p class="mb-2 font-normal text-gray-700">Category: ${meal.strCategory ? meal.strCategory : 'No Category'}</p>
                <p class="mb-3 font-normal text-gray-700">Tags: ${showTags(meal.strTags)}</p>
            </div>
        </div>
            <div class="px-5 pb-5">
                <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-600 focus:outline-none">More Details</a>
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
}