socket.on('signInSuccess', function (userObj) {
    localStorage.setItem('currentUser', userObj.username);
    window.open('app.html', '_self');
});

socket.on('signInFail', function (errMsg) {
    showErrorMessage(errMsg);
});