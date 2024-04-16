

    //creamos los arrays de objetos
    const users = JSON.parse(localStorage.getItem("users")) ||[]
    

    let IDuser = document.getElementById("user-name");
    let password = document.getElementById("password");
    let userName = document.getElementById("name");
    let role = document.getElementById("rol")
    let reservedWord = document.getElementById("reserved-word");
    let btnRegister = document.getElementById("btn-register")

    //funcion para registrar al usuario

    function registerUser(IDuser, userName, role, reservedWord, password) {
        let rUser = findUser(IDuser);
        if (!rUser) {
            users.push({
                IDuser: IDuser,
                userName: userName,
                role: role,
                password: reservedWord,
                reservedWord:reservedWord
            })
            localStorage.setItem("users", JSON.stringify(users));
            alert("Usuario registrado exitosamente")
            window.location.href = "login.html"
            
        } else {
            alert("Usuario ya existente")

        }

    }

    function findUser(IDuser) {
        //funcion para buscar algun usuario por el nombre de usuario como id
        let fUser = users.find((user) => user.IDuser === IDuser)
        return fUser;
    }

    //eventos
    btnRegister.addEventListener("click", () =>{
        if (IDuser.value != "" && userName.value != "" && role.value != "" && reservedWord.value != "") {
            registerUser(
                IDuser.value,
                userName.value,
                role.value,
                reservedWord.value
            )
        } else{
            alert("debes ingresasr todos los datos");
        }

    })

