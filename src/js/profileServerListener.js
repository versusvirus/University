document.addEventListener('DOMContentLoaded', function () {
    let user = localStorage.getItem('currentUser');
    socket.emit('getUserData', user);
    socket.on('userDataAnswer', function (userData) {
        let profileInfoBlock = document.querySelector('.profile-card'),
            profileImage = profileInfoBlock.querySelector('.profile-card-photo'),
            profileNickName = profileInfoBlock.querySelector('.profile-nickname'),
            profileUserName = profileInfoBlock.querySelector('.profile-username'),
            profileLevel = profileInfoBlock.querySelector('.profile-level');
        profileImage.setAttribute('src', userData.userphoto);
        profileNickName.innerText = userData.username;
        profileUserName.innerText = userData.nickname;
        profileLevel.innerText = userData.lvl;
    })
});