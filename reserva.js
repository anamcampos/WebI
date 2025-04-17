function validateToPay(){
  const name = document.booking-form.name.value;
  const email = document.booking-form.email.value;
  const phone = document.booking-form.phone.value;
  const city_country = document.booking-form.city-city_country.value;
  const check_in = document.booking-form.fechaEntrada.value;
  const check_out = document.booking-form.fechaSalida.value;
  const guest =document.booking-form.guests-number.value;
  const adults=document.booking-form.guests-adults.value;
  const kids=document.booking-form.guests-childs.value;
  const room=document.booking-form.rooms.value;
  const checkbox_tour=document.booking-form.tour;
  const tour_type=document.booking-form.tour_type.value;
  const checkbox_terms=document.booking-form.terms;

  if(name.lenght<=1){
    alert('Debe escribir un nombre');
    document.booking-form.name.focus();
    return 0;
  }

  if(email.lenght<=1){
    alert('Debe escribir un correo');
    document.booking-form.email.focus();
    return 0;
  }

  if(!isNaN(phone)){
    alert('Debe ingresar numeros como telefono');
    document.booking-form.phone.focus();
    return 0;
  }

  if (!check_in || !check_out){
    alert("Seleccione la fecha de entrada y/o salida");
    document.booking-form.fechaEntrada.focus();
    document.booking-form.fechaSalida.focus();
    return 0;
  }

  if (new Date(check_out) <= new Date(check_in)) {
    alert("La fecha de salida debe ser posterior a la de entrada.");
    document.booking-form.fechaSalida.focus();
    return 0;
  }

  if(document.booking-form.guests-number.selectedIndex==0){
    alert("Debe seleccionar una cantidad de huespedes");
    document.booking-form.guests-number.focus();
    return 0;
}
  let sumGuest = parseInt(adults) + parseInt(kids);
  let guests = parseInt(guest);

  if(sumGest!=guests){
    alert("Debe seleccionar una cantidad de adultos y/o niños igual a la cantidad de húespedes");
    document.booking-form.guests-adults.focus();
    document.booking-form.guests-childs.focus();
    return 0;
  }

  if(document.booking-form.rooms.selectedIndex<=0){
    alert("Debe seleccionar un tipo de habitacion");
    document.booking-form.rooms.focus();
    return;
  }

  if (checkbox_tour.checked) {
    if (!tour_type.value) {
      alert("Debe seleccionar un tour si marcó la opción de reservar tour.");
      document.booking-form.tour_type.focus();
      return;
    }
  }

  if (!checkbox_tour.terms) {
    alert("Debe aceptar la politica de privacidad");
    document.booking-form.terms.focus();
    return;
  }

}