
const users = JSON.parse(localStorage.getItem("users")) || []
let IDuser = document.getElementById("user-name")
let password = document.getElementById("password")
let btnLogin = document.getElementById("btn-login")

function findUserLogin(IDuser, password) {
    return users.find((user) => user.IDuser === IDuser && user.password === password)
}


btnLogin.addEventListener("click", () => {
    console.log('click');
    if (IDuser.value != "" && password.value != "") {
        let user = findUserLogin(IDuser.value, password.value);
        if (user) {
            alert('Contraseña correcta');
            
            if (user.role === "administrador") {
                window.location.href = "administrador.html"
            } else if (user.role === "usuario") {
                window.location.href = "rentar.html"
            }
        } else {
            alert("Usuario o contraseña incorrecta");
        }
    } else {
        alert("Debes ingresar todos los campos")
    }


})

