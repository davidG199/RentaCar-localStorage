// Cuando carga la página
document.addEventListener("DOMContentLoaded", function () {
    // Obtener datos de localStorage
    let cars = JSON.parse(localStorage.getItem("cars")) || [];
  
    // Llamar a una función para construir la tabla
    buildTable(cars);
  
    //evento para el boton de guardar autos
    btnSaveCar.addEventListener('click', () => {
        console.log("click");
        if (plateNumber.value != "" && brand.value != "" && state.value != "" && dailyValue.value != "") {
            addCar(
                plateNumber.value,
                brand.value,
                state.value,
                dailyValue.value,
                cars
            );
            // Volver a construir la tabla después de agregar un nuevo auto
            buildTable(cars);
        } else {
            alert("Debes ingresar todos los campos");
        }
    });
  });

let plateNumber = document.getElementById("platenumber");
let brand = document.getElementById("brand");
let state = document.getElementById("state");
let dailyValue = document.getElementById("dailyvalue");
let btnSaveCar = document.getElementById('btnsavecar');

// Función para saber si ya existe un carro según la placa
function findCar(plateNumber, cars) {
    return cars.find((car) => car.plateNumber === plateNumber);
}
//funcion para agregar un auto al array cars
function addCar(plateNumber, brand, state, dailyValue, cars) {
    let aCar = findCar(plateNumber, cars);
    if (!aCar) {
        cars.push({
            plateNumber: plateNumber,
            brand: brand,
            state: state,
            dailyValue: dailyValue
        });
        localStorage.setItem("cars", JSON.stringify(cars));
        alert('Auto agregado con éxito');
    } else {
        alert("Vehículo ya registrado");
    }
}

// Función para construir la tabla
function buildTable(cars) {
    let tableBody = document.querySelector(".table tbody");

    // Limpiar el contenido actual de la tabla
    tableBody.innerHTML = "";

    // Construir filas de la tabla en función de los datos ingresados
    cars.forEach(function (car, index) {
        let row = tableBody.insertRow();
        let cellIndex = row.insertCell(0);
        let cellBrand = row.insertCell(1);
        let cellPlateNumber = row.insertCell(2);
        let cellDailyValue = row.insertCell(3);
        let cellState = row.insertCell(4);

        cellIndex.innerHTML = index + 1;
        cellBrand.innerHTML = car.brand;
        cellPlateNumber.innerHTML = car.plateNumber;
        cellDailyValue.innerHTML = car.dailyValue;
        cellState.innerHTML = car.state;
    });
}



