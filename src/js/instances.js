class User {
    constructor(nickName, password, userName) {
        this.nickName = nickName;
        this.password = password;
        this.userName = userName;
    }

    getNickName () {
        return this.nickName
    }

    setNickName (newName) {
        this.nickName = newName;
    }
}