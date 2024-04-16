let users = JSON.parse(localStorage.getItem("users")) || []
let IDuser = document.getElementById("user-name");
let password = document.getElementById("password");
let reservedWord = document.getElementById("reserved-word");
let btnRecoveryRegister = document.getElementById("btnrecoveryregister")

function findUser(IDuser) {
    //funcion para buscar algun usuario por el nombre de usuario como id
    let fUser = users.find((user) => user.IDuser === IDuser)
    return fUser;
}

function updateUserPassword (user){
    let userIndex = users.findIndex(u => u.IDuser === user.IDuser)
    if(userIndex !== -1){
        users[userIndex].password = user.password;
        localStorage.setItem("users", JSON.stringify(users))
    } 
}

btnRecoveryRegister.addEventListener('click', () =>{
    console.log("click");
    if (IDuser.value != "" && password.value != "" && reservedWord.value != "") {
        let foundUser = findUser(IDuser.value)
        if (foundUser && foundUser.reservedWord === reservedWord.value) {
            foundUser.password = password.value;
            updateUserPassword(foundUser)
            alert("contraseña actualizada exitosamente")
            window.location.href = "login.html"
        } else{
            alert("usuario no encontrado o palabra reservada incorrecta")
        }
    }else{
        alert("campos vacios")
    }

})

