var recipePopup = document.querySelector('.recipe-popup'),
    recipeImg = document.querySelectorAll('img.profile-recipes-recipe-block-img');

recipeImg.forEach( function (item) {
    item.addEventListener('click', openPopupRecipeWindow);
});

function openPopupRecipeWindow() {
    recipePopup.style.display = 'flex';
}

