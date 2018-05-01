document.addEventListener('DOMContentLoaded', function () {
    socket.emit('getRecipes');
    socket.on('recipesLoaded', function (recipes) {
        let recipesPlace = document.querySelector('.app-recipes');
        for (let i = 0, len = recipes.length; i < len; i++) {
            let tmpBlock = document.createElement('div'),
                tmpImage = document.createElement('img'),
                tmpCaption = document.createElement('div');
            tmpBlock.classList.add('app-recipes-block');
            tmpImage.classList.add('app-recipe');
            tmpCaption.classList.add('app-recipe-caption');
            tmpCaption.innerText = recipes[i].name;
            tmpImage.setAttribute('data-component', 'Button');
            tmpImage.setAttribute('data-name', `RecipeButton${i}`);
            tmpImage.setAttribute('data-exp', recipes[i].exp);
            tmpImage.setAttribute('data-recipe-name', recipes[i].name);
            tmpImage.setAttribute('src', recipes[i].imgSrc);
            tmpImage.recipeData = recipes[i].steps;
            tmpBlock.appendChild(tmpImage);
            tmpBlock.appendChild(tmpCaption);
            recipesPlace.prepend(tmpBlock);
        }
        for (let i = 0, len = scripts.length; i < len; i++){
            let tmpScript = document.createElement('script');
            tmpScript.setAttribute('src', scripts[i]);
            document.body.appendChild(tmpScript);
        }
        let user = localStorage.getItem('currentUser');
        socket.emit('getUserData', user);
        socket.on('userDataAnswer', function (userData) {
            setTimeout(function () {
                let userInfoBlock = document.querySelector('.profile'),
                    userPhoto = userInfoBlock.querySelector('.profile-img'),
                    userName = userInfoBlock.querySelector('.profile-name'),
                    userLevel = userInfoBlock.querySelector('.profile-level'),
                    userBar = userInfoBlock.querySelector('.profile-level-bar.loading-bar');
                userPhoto.setAttribute('src', userData.userphoto);
                userName.innerText = userData.username;
                userLevel.innerText = userData.lvl + ' уровень';
                userBar.control.getMarkup().classList.remove('loading-bar');
                userBar.control.setPercents(userData.experience + 50);
            }, 100);
        })
    });
});