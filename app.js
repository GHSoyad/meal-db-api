// Event listener for search button
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch();
})

// Event listener for enter button
document.getElementById('search-meal').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        processSearch();
    }
})

// Function to get search data
const processSearch = () => {
    const searchMeal = document.getElementById('search-meal').value;
    if (searchMeal === '') {
        return alert('Enter something to search!!');
    };
    displayLoader(true);
    loadMeals(searchMeal);
}

// Function to load meal data
const loadMeals = async (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMeals(data.meals);
}

// Function to display meal data
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
            mealDiv.classList.add('bg-white', 'rounded-lg', 'border', 'border-gray-200', 'shadow-md', 'flex', 'flex-col', 'justify-between', 'text-center');
            mealDiv.innerHTML = `
            <div>
                <img class="rounded-t-lg" src="${meal.strMealThumb}" alt="">
                <div class="p-2 md:pt-5 md:px-5">
                    <h5 class="mb-1 md:mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 leading-tight">${meal.strMeal}</h5>
                    <p class="md:mb-1 text-gray-700"><span class="font-medium">Category:</span> ${meal.strCategory ? meal.strCategory : 'No Category'}</p>
                    <p class="text-gray-700 hidden sm:block"><span class="font-medium">Tags:</span> ${showTags(meal.strTags)}</p>
                </div>
            </div>
            <div class="p-2 md:pb-5 md:px-5 flex gap-1 sm:gap-2 flex-wrap justify-center">
                <label onclick="openModalMealDetails('${meal.idMeal}')" for="displayMealDetail" class="modal-button text-white bg-emerald-700 hover:bg-emerald-600 focus:outline-none font-medium rounded-lg text-sm px-3 py-1.5 md:py-2.5 text-center cursor-pointer">Instructions</label>
                <label onclick="openModalMealDetails('${meal.idMeal}')" for="displayMealVideo" class="modal-button text-white bg-emerald-700 hover:bg-emerald-600 focus:outline-none font-medium rounded-lg text-sm px-3 py-1.5 md:py-2.5 text-center cursor-pointer">Watch</label>
            </div>
            `
            mealsContainer.appendChild(mealDiv);
        });
    } catch (error) {
        console.log(error);
    }

    displayLoader(false);
}

const modalContainer = document.getElementById('modal-container');
// Function to load meal details data
const openModalMealDetails = async (mealId) => {
    modalContainer.innerHTML = '';
    displayLoader(true);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalMealDetails(data.meals[0]);
    displayModalMealVideo(data.meals[0]);
}

// Function to display meal instruction modal
const displayModalMealDetails = meal => {
    modalContainer.innerHTML = `
    <label for="displayMealDetail" class="btn btn-sm btn-circle absolute right-3 top-3">✕</label>
    <h3 class="text-lg font-bold">${meal.strMeal}</h3>
    <p><span class="font-medium">Tags:</span> ${showTags(meal.strTags)}</p>
    <p class="py-4"><span class="font-medium">Instructions:</span> ${meal.strInstructions}</p>
    `
    displayLoader(false);
}

// Function to open meal video modal
const displayModalMealVideo = meal => {
    console.log(meal)
    const mealVideoContainer = document.getElementById('modal-video-container');
    mealVideoContainer.innerHTML = `
    <label for="displayMealVideo" class="btn btn-circle text-lg font-bold absolute right-3 top-3 text-red-600 bg-white border-2 border-red-600 hover:bg-red-600 hover:text-white hover:border-red-600">✕</label>
    <iframe class="w-full meal-video" width="852" height="480" src="${meal.strYoutube.replace('watch?v=', 'embed/')}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
    // Stop video after closing modal
    const mealVideo = document.querySelectorAll('.meal-video');
    const mealVideoClose = document.getElementById('meal-video-label');

    for (video of mealVideo) {
        console.log(video)
        mealVideoContainer.addEventListener('click', function () {
            video.removeAttribute('src');
        })
        mealVideoClose.addEventListener('click', function () {
            video.removeAttribute('src');
        })
    }

}

// Function to get tags data
function showTags(tags) {
    if (tags === '' || tags === null) {
        return 'No Tags';
    }
    const split = tags.split(',');
    const join = split.join(', ');
    return join;
}

// Function to display and hide loader
const displayLoader = isTrue => {
    const loader = document.getElementById('loader');
    if (isTrue) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}
