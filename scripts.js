//------------------------------------------------------------------------------------------------------------------------------//
//********************** BOOKING FORM FUNCTIONS **********************//
//function to validate fields and go to payment page
function validateToPay() {
  const form = document.forms["booking-form"];
  const name = form.name.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const city_country = form.city_country.value;
  const check_in = document.getElementById("fechaEntrada").value;
  const check_out = document.getElementById("fechaSalida").value;
  const guest = form["guests-number"].value;
  let adults = form["guests-adults"].value;
  let kids = form["guests-childs"].value;
  const room = form.rooms.value;
  const checkbox_tour = form.tour;
  const tour_type = form.tour_type.value;
  const checkbox_terms = form.terms;

  if (name.length <= 3) {
    alert('Debe escribir un nombre');
    form.name.focus();
    return;
  }

  if (email.length <= 4) {
    alert('Debe escribir un correo');
    form.email.focus();
    return;
  }

  if (isNaN(phone)) {
    alert('Debe ingresar solo números como teléfono');
    form.phone.focus();
    return;
  }

  if (!check_in || !check_out) {
    alert("Seleccione la fecha de entrada y/o salida");
    return;
  }

  if (new Date(check_out) <= new Date(check_in)) {
    alert("La fecha de salida debe ser posterior a la de entrada.");
    return;
  }

  if (form["guests-number"].selectedIndex === 0) {
    alert("Seleccione una cantidad de huéspedes");
    return;
  }

  adults = adults === "" ? 0 : parseInt(adults); //This helps if the field adults or kids are empty, then a 0 is assigned to be used later
  kids = kids === "" ? 0 : parseInt(kids);

  if (adults <= 0) {
    alert("Debe seleccionar al menos un adulto.");
    return;
  }

  const suma = adults + kids;
  if (suma !== parseInt(guest)) {
    alert("La suma de adultos y niños debe ser igual al número de huéspedes.");
    return;
  }

  if (form.rooms.selectedIndex <= 0) {
    alert("Debe seleccionar un tipo de habitación");
    return;
  }

  if (checkbox_tour.checked && tour_type === "") {
    alert("Debe seleccionar un tour si marcó la opción de reservar tour.");
    return;
  }

  if (!checkbox_terms.checked) {
    alert("Debe aceptar la política de privacidad");
    return;
  }

  sessionStorage.setItem('holder-name', name);
  sessionStorage.setItem('email', email);
  window.location.href = "payment.html";
}


//function to load the information in the booking form from the main or the room pages
function loadBookingFormData() {
  const fromMain = sessionStorage.getItem('fromMain');
  const fromMaster = sessionStorage.getItem('fromMaster');
  const fromDeluxe = sessionStorage.getItem('fromDeluxe');
  const fromJunior = sessionStorage.getItem('fromJunior');

  if (fromMain === 'true') {
    const habitaciones = sessionStorage.getItem('guests-number');
    const fechaEntrada = sessionStorage.getItem('fechaEntrada');
    const fechaSalida = sessionStorage.getItem('fechaSalida');

    if (habitaciones) {
      document.getElementById("guests-number").value = habitaciones;
    }
    if (fechaEntrada) {
      document.getElementById("fechaEntrada").value = fechaEntrada;
    }
    if (fechaSalida) {
      document.getElementById("fechaSalida").value = fechaSalida;
    }
    sessionStorage.removeItem('fromMain');
  } else {
    sessionStorage.removeItem('guests-number');
    sessionStorage.removeItem('fechaEntrada');
    sessionStorage.removeItem('fechaSalida');
  }

  if (fromMaster === 'true') {
    const room1 = sessionStorage.getItem('Master_suite');
    if (room1) {
      document.getElementById('rooms').value = room1;
    }
    sessionStorage.removeItem('fromMaster');
  } else {
    sessionStorage.removeItem('rooms');
  }

  if (fromDeluxe === 'true') {
    const room1 = sessionStorage.getItem('Deluxe_queen');
    if (room1) {
      document.getElementById('rooms').value = room1;
    }
    sessionStorage.removeItem('fromDeluxe');
  } else {
    sessionStorage.removeItem('rooms');
  }

  if (fromJunior === 'true') {
    const room1 = sessionStorage.getItem('Junior_suite');
    if (room1) {
      document.getElementById('rooms').value = room1;
    }
    sessionStorage.removeItem('fromJunior');
  } else {
    sessionStorage.removeItem('rooms');
  }
}

//function to calculate prices 
function validateToPay() {
  const form = document.forms["booking-form"];
  const adultos = parseInt(form["guests-adults"].value) || 0;
  const ninos = parseInt(form["guests-childs"].value) || 0;
  const tourSeleccionado = form["tour_type"].value;

  const precioAdulto = 60;
  const precioNino = 45;
  let precioTour = 0;

  if (form["tour"].checked) {
    if (tourSeleccionado === "lancha") precioTour = 30;
    if (tourSeleccionado === "snorkel") precioTour = 70;
    if (tourSeleccionado === "canopy") precioTour = 56;
  }
  const total = (adultos * precioAdulto) + (ninos * precioNino) + precioTour;

  localStorage.setItem("totalAPagar", total);
  window.location.href = "payment.html";
}

//------------------------------------------------------------------------------------------------------------------------------//
//********************** MAIN FUNCTIONS **********************//
//Code to validate the form in the main page
function validateForm() {
  const destino = document.reservaForm.destino.value;
  const habitaciones = document.reservaForm.habitaciones.value;
  const fechaEntrada = document.reservaForm.entrada.value;
  const fechaSalida = document.reservaForm.salida.value;
  const hoy = new Date();

  if (!destino) {
    alert("Seleccione un destino");
    return 0;
  }

  if (!fechaEntrada || !fechaSalida) {
    alert("Seleccione la fecha de entrada y/o salida");
    return 0;
  }

  if (new Date(fechaEntrada) < hoy) {
    alert("La fecha de entrada debe ser posterior a la de hoy");
    return 0;
  }

  if (new Date(fechaSalida) <= new Date(fechaEntrada)) {
    alert("La fecha de salida debe ser posterior a la de entrada.");
    return 0;
  }

  const mapaHabitaciones = {
    "1": "2",
    "2": "4",
    "3": "6"
  };
  const numHuespedes = mapaHabitaciones[habitaciones];
  sessionStorage.setItem('guests-number', numHuespedes);
  sessionStorage.setItem('fechaEntrada', fechaEntrada);
  sessionStorage.setItem('fechaSalida', fechaSalida);
  sessionStorage.setItem('fromMain', 'true');
  window.location.href = "booking_form.html";
}



//------------------------------------------------------------------------------------------------------------------------------//
//********************** RESERVE ROOMS **********************//
function reserveMasterSuite(){
  const room = "Master_suite";
  sessionStorage.setItem('Master_suite',room);
  sessionStorage.setItem('fromMaster', true);
  window.location.href = "booking_form.html";
}

function reserveDeluxeQueen(){
  const room = "Deluxe_queen";
  sessionStorage.setItem('Deluxe_queen',room);
  sessionStorage.setItem('fromDeluxe', true);
  window.location.href = "booking_form.html";
}

function reserveJuniorSuite(){
  const room = "Junior_suite";
  sessionStorage.setItem('Junior_suite',room);
  sessionStorage.setItem('fromJunior', true);
  window.location.href = "booking_form.html";
}


//------------------------------------------------------------------------------------------------------------------------------//
//********************** PAYMENT FORM **********************//

//code to validate fields
function validatePayment() {
  const name = document.payment_form.name.value;
  const email = document.payment_form.email.value;
  const target = document.payment_form.target.value;
  const cvv = document.payment_form.cvv.value;
  const exp = document.payment_form.expiration.value;

  if (isNaN(target)) {
    alert("El número de tarjeta debe contener solo dígitos");
    document.payment_form.target.focus();
    return;
  }

  if (target.length < 16) {
    alert("El número de tarjeta debe tener 16 números");
    document.payment_form.target.focus();
    return;
  }

  if (!exp) {
    alert("Debe seleccionar una fecha futura.");
    document.payment_form.expiration.focus();
    return;
  }

  if (isNaN(cvv)) {
    alert("El CVV debe contener solo dígitos");
    document.payment_form.cvv.focus();
    return;
  }

  if (cvv.length > 4 || cvv.length < 3) {
    alert("El CVV debe tener 3 o 4 números");
    document.payment_form.cvv.focus();
    return;
  }

  if (name.length <= 1) {
    alert('Debe escribir un nombre');
    document.payment_form.name.focus();
    return;
  }

  if (email.length <= 1) {
    alert('Debe escribir un correo');
    document.payment_form.email.focus();
    return;
  }

  window.location.href = "payment_confirmation.html";
}

//Code to load the information filled in the booking form
function loadPaymentFormData() {
  const name = sessionStorage.getItem('holder-name');
  const email = sessionStorage.getItem('email');

  if (name) {
    const nameInput = document.getElementById('holder-name');
    if (nameInput) nameInput.value = name;
  }

  if (email) {
    const emailInput = document.getElementById('email');
    if (emailInput) emailInput.value = email;
  }
  
//function to display the total to pay
  const total = localStorage.getItem("totalAPagar") || 0;

  const totalDisplay = document.createElement("div");
  totalDisplay.innerHTML = `<h4>Total a pagar: $${total} USD</h4>`;
  totalDisplay.style.marginBottom = "15px";
  totalDisplay.style.color = "#070808";

  const form = document.querySelector(".payment-method form");
  form.parentNode.insertBefore(totalDisplay, form);
}


