let navBarContainer = document.querySelector("#navbarNav");

function removeUserLogged() {
  return localStorage.removeItem("userLogged");
}

function createNavContent() {
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  let nav = document.createElement("ul");
  nav.className = "navbar-nav";

  nav.innerHTML = `
  ${
    userLogged
      ? `
      <li class="nav-item">
        <a class="nav-link">${userLogged.userName}</a>
      </li>
      ${
        userLogged.role === "administrador"
          ? `
        <li class="nav-item">
          <a href="./devolucion.html" class="nav-link">Devolucion</a>
        </li>
        <li class="nav-item">
          <a href="./administrador.html" class="nav-link">Administrador</a>
        </li>
      `
          : ``
      }
      <li class="nav-item">
        <a class="nav-link" href="./index.html" onclick="removeUserLogged()">Cerrar sesion</a>
      </li>
      `
      : `
        <li class="nav-item">
            <a class="nav-link" href="./login.html">Iniciar sesion</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="./registro.html">Registro</a>
        </li>
        `
  }
    `;

  navBarContainer.appendChild(nav);
}

createNavContent();
