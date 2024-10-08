
const users = JSON.parse(localStorage.getItem("users")) || []
const userLogged = JSON.parse(localStorage.getItem("userLogged")) || []
let IDuser = document.getElementById("user-name")
let password = document.getElementById("password")
let btnLogin = document.getElementById("btn-login")

function findUserLogin(IDuser, password) {
    return users.find((user) => user.IDuser === IDuser && user.password === password)
}


btnLogin.addEventListener("click", () => {
    // console.log('click');
    if (IDuser.value != "" && password.value != "") {
        let user = findUserLogin(IDuser.value, password.value);
        if (user) {
            localStorage.setItem("userLogged", JSON.stringify(user));
            alert('Contraseña correcta');
            // console.log(user);
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

