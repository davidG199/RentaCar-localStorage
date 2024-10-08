let returnCar = JSON.parse(localStorage.getItem("returnCar")) || []
let rent = JSON.parse(localStorage.getItem("rent")) || []
let cars = JSON.parse(localStorage.getItem("cars")) || []
let rentNumber = document.getElementById("rentnumber")
let plateNumber = document.getElementById("platenumber")
let returnDate = document.getElementById("returndate")

//llenamos el select con los numeros de renta que estan disponibles
function fillSelectRent() {
    rentNumber.innerHTML = "<option value='' selected disabled>Numero de renta</option>";

    //filtramos el select
    let avaliableRentNumbers = rent.filter(renta => renta.status === "activa")

    //utilizamos un foreach para llenar las opciones con los numeros de renta disponibles
    avaliableRentNumbers.forEach(function (renta) {
        let option = document.createElement("option")
        option.value = renta.rentNumber;
        option.text = renta.rentNumber;
        
        rentNumber.appendChild(option)
    })
}
document.addEventListener("DOMContentLoaded", function () {
    fillSelectRent();
    
    //cuando se selecciona un numero de renta, se llenan los campos con la placa y la fecha de la renta
    rentNumber.addEventListener("change", function () {
        //obtener el numero de renta
        let selectRentNumber = rentNumber.value;
        //buscamos la renta correspondiente al numero seleccionado
        let selectRent = rent.find(renta => renta.rentNumber == selectRentNumber)
        console.log(selectRent);
        //mostrar la placa y la fecha en sus respectivos campos
        if (selectRent) {
            plateNumber.value = selectRent.plateNumber
            returnDate.value = selectRent.finalDate
        } else {
            alert("La renta seleccionada no existe o no esta disponible")
            plateNumber.value = ""
            returnDate.value = ""
        }
    })
})

function updateCarState(plateNumber, state) {
    let carIndex = cars.findIndex(car => car.plateNumber === plateNumber);
    if (carIndex !== -1) {
        cars[carIndex].state = state;
        localStorage.setItem("cars", JSON.stringify(cars));
    }
}

document.getElementById("btnsavedevolucion").addEventListener('click', function () {
    
    // Buscar la renta correspondiente al número seleccionado
    let selectedRent = rent.find(renta => renta.rentNumber == rentNumber.value);

    if (rentNumber.value != "" && plateNumber.value != "" && returnDate.value != "") {
        // addReturnCar(rentNumber.value, plateNumber.value, returnDate.value)
        if (selectedRent && selectedRent.status === "activa") {
            selectedRent.status = "inactiva";
            updateCarState(plateNumber.value, "Disponible")

            // Guardar los cambios en el almacenamiento local
            localStorage.setItem("rent", JSON.stringify(rent));
            fillSelectRent();
            cleanForm();
            swal.fire({
                title: 'Renta devuelta con éxito',
                confirmButtonText: 'Aceptar'
            })
        }
    } else{
        swal.fire({
            title: 'Error',
            text: 'Debes de llenar todos los campos',
            confirmButtonText: 'Aceptar'
        })
    }
});

function cleanForm(){
    rentNumber.value = "";
    plateNumber.value = "";
    returnDate.value = "";
}

