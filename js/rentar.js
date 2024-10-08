let rent = JSON.parse(localStorage.getItem("rent")) || [];
let cars = JSON.parse(localStorage.getItem("cars")) || []
let plateNumber = document.getElementById("platenumber")
let initialDate = document.getElementById("initialdate")
let finalDate = document.getElementById("finaldate")
let rentNumber = document.getElementById("rentnumber")
let btnSaveRent = document.getElementById("btnsaverent")

//funcion para llenar el select con las placas registradas
function fillSelectPlate() {
    //limpiamos el select
    plateNumber.innerHTML = "<option value='' selected disabled>Selecciona una placa</option>";
    //filtramos el select 
    let avaliableCars = cars.filter(car => car.state === "Disponible");
    //utilizamos un foreach para llenar las opciones con las placas disponibles
    avaliableCars.forEach(function (car) {
        let plateOption = document.createElement("option")
        plateOption.value = car.plateNumber;
        plateOption.text = car.plateNumber;
        plateNumber.appendChild(plateOption);
    });

    //limpiamos la tabla en el modal
    let carListTable = document.getElementById("carlisttable")
    carListTable.innerHTML = `
    <thead>
        <th>Marca</th>
        <th>Placa</th>
        <th>Valor día</th>
        <th>Estado</th>
    </thead>
    <tbody></tbody>
    `;

    //utilizamos un foreach para llenar las filas de las tablas con los autos disponibles 
    cars.forEach(function (car) {
    const newRow = carListTable.insertRow();
    newRow.innerHTML = `<td>${car.brand}</td><td>${car.plateNumber}</td><td>${car.dailyValue}</td><td>${car.state}</td>`

    })

}

//llamamos a la funcion para llenar el select cuando recargamos la pagina
document.addEventListener("DOMContentLoaded", function () {
    fillSelectPlate();  
})

//funcion para guardar la renta del vehiculo con sus validaciones
function saveRent() {
    //logica para validar las fechas de renta
    let currentDate = new Date(); // Obtener la fecha actual
    currentDate.setHours(0, 0, 0, 0);
    let rentNumValue = generateRentNumber();
    // Convertir las fechas a objetos de fecha
    let initialDateValue = new Date(initialDate.value + "T00:00:00");
    let finalDateValue = new Date(finalDate.value + "T00:00:00");
    // Validar la fecha inicial
    if (initialDateValue.getTime() < currentDate.getTime()) {
        swal.fire({
            title: "Error",
            text: "La fecha inicial no puede ser inferior a la fecha actual.",
            confirmButtonText: "Aceptar"
        })
        return; // Detener la función si hay un error
    }
    // Validar la fecha final
    if (finalDateValue < initialDateValue) {
        swal.fire({
            title: "Error",
            text: "La fecha final debe ser igual o superior a la fecha inicial.",
            confirmButtonText: "Aceptar"
        })
        return; // Detener la función si hay un error
    }

    //actulizar el estado del automovil seleccionado 
    if (!updateCarState(plateNumber.value)) {
        return;
    }


    rent.push({
        plateNumber: plateNumber.value,
        initialDate: initialDate.value,
        finalDate: finalDate.value,
        rentNumber: rentNumValue,
        status: "activa"
    });

    swal.fire({
        title: "Guardado",
        text: "La renta se ha guardado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar"
    })
    localStorage.setItem("rent", JSON.stringify(rent));
    cleanFormRent();
    fillSelectPlate();
}
//funcion para limpiar el formulario 
function cleanFormRent() {
    plateNumber.value = ""
    initialDate.value = ""
    finalDate.value = ""
    rentNumber.value = ""
}
//funcion para generar el numero de la renta
function generateRentNumber (){
    let ultimaRenta = rent[rent.length - 1];
    let nuevoNumeroRenta = ultimaRenta ? ultimaRenta.rentNumber + 1: 1;
    rentNumber.value = nuevoNumeroRenta
    return nuevoNumeroRenta;
}
//funcion para actualizar el estado del auto seleccionado segun la placa
function updateCarState(plateNumber) {
    //buscamos el indice del auto seleccionado
    let selectCarIndex = cars.findIndex(car => car.plateNumber === plateNumber)
    //verificamos si la placa seleccionada existe en el array de autos
    if (selectCarIndex !== -1) {
        cars[selectCarIndex].state = "No disponible";
        //guardamos el array actualizado
        localStorage.setItem("cars", JSON.stringify(cars))
    } else{
        alert("La placa seleccionada no se encuentra en la lista de autos disponible")
        return false;
    }
    return true
}

//evento para el boton de guardar renta
btnSaveRent.addEventListener('click', () => {
    // console.log("click");
    if (plateNumber.value != "" && initialDate.value != "" && finalDate.value != "") {
        saveRent()
    } else{
        alert("Debes de llenar todos los campos")
    }
})
//evento para el boton de listar autos disponibles
document.getElementById("btnListCars").addEventListener('click', function(){
    fillSelectPlate();
})
