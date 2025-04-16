 //----------------------------------------------------------------------------------------------------------------------------------------------//
 //This code is for the button SEARCH in the main page form
//Code to validate and get information form the main form
function manejarFormularioReserva() {
    const form = document.getElementById("reservaForm");
    if (!form) return; //

    form.addEventListener("submit", function (event) { //Event to get the information when the button clicked
      event.preventDefault(); //Avoids to refresh the page
  
      let destino = document.getElementById("destino").value;
      let fechaEntrada = document.getElementById("entrada").value;
      let fechaSalida = document.getElementById("salida").value;
      let habitaciones = document.getElementById("habitaciones").value;
      let hoy = new Date();
  
      if (!destino) {
        alert("Por favor, seleccione un hotel.");
        return;
      }

      if(new Date(fechaEntrada) <= hoy){
        alert("La fecha de entrada debe ser posterior a la de hoy");
        return;
      }
  
      if (new Date(fechaSalida) <= new Date(fechaEntrada)) {
        alert("La fecha de salida debe ser posterior a la de entrada.");
        return;
      }

      if (new Date(fechaEntrada) > new Date(fechaSalida)) {
        alert("La fecha de entrada debe ser anterior a la fecha de salida");
        return;
      }
  
      //Send the information to booking form page
      let url = `booking_form.html?fechaEntrada=${encodeURIComponent(fechaEntrada)}&fechaSalida=${encodeURIComponent(fechaSalida)}&habitaciones=${encodeURIComponent(habitaciones)}&destino=${encodeURIComponent(destino)}`;
      window.location.href = url;
    });
  }
  
  //Code to fill the form in booking form page
  function rellenarFormularioBooking() {
    if (!window.location.href.includes("booking_form.html")) return;
  
    function getQueryParam(param) { //Function to read the info in the URL
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }
  
    window.addEventListener("DOMContentLoaded", () => { //When the booking form page refresh and set the values
      const fechaEntrada = getQueryParam("fechaEntrada");
      const fechaSalida = getQueryParam("fechaSalida");
      const habitaciones = getQueryParam("habitaciones");
  
      if (fechaEntrada) {
        const fechaInput = document.getElementById("fechaEntrada");
        if (fechaInput) fechaInput.value = fechaEntrada;
      }
  
      if (fechaSalida) {
        const fechaInput = document.getElementById("fechaSalida");
        if (fechaInput) fechaInput.value = fechaSalida;
      }
  
      const mapaHabitaciones = {
        "1": "2",
        "2": "4",
        "3": "6"
      };
  
      const numHuespedes = mapaHabitaciones[habitaciones];
      const selectHuespedes = document.getElementById("guests-number");
      if (numHuespedes && selectHuespedes) {
        selectHuespedes.value = numHuespedes;
      }
    });
  }
  
  //Depends on the current page, run the function
  document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href.includes("main.html")) {
      manejarFormularioReserva();
    }
  
    if (window.location.href.includes("booking_form.html")) {
      rellenarFormularioBooking();
    }
  });

  //----------------------------------------------------------------------------------------------------------------------------------------------//


  