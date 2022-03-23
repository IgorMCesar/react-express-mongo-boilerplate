export function validarEmail(valor) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)) {
    alert('La dirección de email ' + valor + ' es correcta.');
  } else {
    alert('La dirección de email es incorrecta.');
  }
}

export function EmailValidation(enteredEmail) {
  const exp = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;

  if (enteredEmail.match(exp)) {
    alert('Yeah! a valid email!');

    return true;
  } else {
    alert('Sorry! an invalid email!');

    return false;
  }
}
