var socket = io(),
    scripts = [
        '/js/instances.js',
        '/js/validates.js',
        '/js/components.js',
        '/js/Core-Init.js',
        '/js/popupsMixin.js',
        '/js/mainHandlers.js',
        '/js/logics.js',
        '/js/appHandlers.js',
    ];


function showErrorMessage(errMsg) {
    let errorPlace = document.querySelector('.validate-place'),
        tmpErrBlock = document.createElement('div');
    tmpErrBlock.innerText = errMsg;
    tmpErrBlock.classList.add('errorWindow');
    errorPlace.appendChild(tmpErrBlock);
    setTimeout(function () {
        $(tmpErrBlock).fadeOut('slow', function () {
            errorPlace.removeChild(tmpErrBlock);
        })
    }, 3000);
}

function showInfoMessage(msg) {
    let successPlace = document.querySelector('.validate-place'),
        tmpInfoBlock = document.createElement('div');
    tmpInfoBlock.innerText = msg;
    tmpInfoBlock.classList.add('infoWindow');
    successPlace.appendChild(tmpInfoBlock);
    setTimeout(function () {
        $(tmpInfoBlock).fadeOut('slow', function () {
            successPlace.removeChild(tmpInfoBlock);
        })
    }, 3000);
}