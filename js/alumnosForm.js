let flag2 = true;

function pass(passwordFieldId, iconId) {
    const passwordField = document.querySelector(`#${passwordFieldId}`);
    const passIcon = document.querySelector(`#${iconId}`);

    if (flag2) {
        passwordField.type = "text";
        passIcon.src = "/imagenes/eye-transp.png";
		passIcon.style.width = "20px"; 
        flag2 = false;
    } else {
        passwordField.type = "password";
        passIcon.src = "/imagenes/eye-slash-transp.png";
		passIcon.style.width = "29px"; 
        flag2 = true;
    }
}

//  para contraseña 1 y su icono
document.querySelector("#pass-icon").addEventListener("click", function() {
    pass("password", "pass-icon");
});

//  para contraseña 2 y su icono
document.querySelector("#pass-icon2").addEventListener("click", function() {
    pass("password2", "pass-icon2");
});


/* ------------------------------ VALIDACIÓN FORMULARIO ------------------------------ */
/* --------------------------------------------------------------------------------------*/

const formulario = document.getElementById("formulario");
// const inputs = document.querySelectorAll("#formulario input"); // Accede a todos los inputs del formulario
const inputsAndSelects = document.querySelectorAll("#formulario input, #formulario select");


const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
  nombre: /^[a-zA-ZÀ-ÿ\s]{3,30}$/,
  apellido: /^[a-zA-ZÀ-ÿ\s]{2,30}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*]).{8,}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  documento: /^\d{7,8}$/
};

const campos = {
  usuario: false,
  nombre: false,
  apellido: false,
  password: false,
  correo: false,
  documento: false,
  cursoProgramacion: false,
  cursoIdiomas: false
};

// Función para validar el formulario
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "Firstname":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "Surname":
      validarCampo(expresiones.apellido, e.target, "apellido");
      break;
    case "username":
      validarCampo(expresiones.usuario, e.target, "usuario");
      break;
    case "ID-number":
      validarCampo(expresiones.documento, e.target, "documento");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "contrasena");
      validarPassword2();
      break;
    case "password2":
      validarPassword2();
      break;
    case "email":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "cursoProgramacion":
      validarCampoCurso(e.target, "cursoProgramacion");
      break;
    case "cursoIdiomas":
      validarCampoCurso(e.target, "cursoIdiomas");
      break;
  }
};

// Función para validar un campo específico
const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`${campo}`).classList.remove("formulario__grupo-incorrecto");
    document.getElementById(`${campo}`).classList.add("formulario__grupo-correcto");
    document.querySelector(`#${campo} i`).classList.add("fa-check-circle");
    document.querySelector(`#${campo} i`).classList.remove("fa-times-circle");
    document.querySelector(`#${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document.getElementById(`${campo}`).classList.add("formulario__grupo-incorrecto");
    document.getElementById(`${campo}`).classList.remove("formulario__grupo-correcto");
    document.querySelector(`#${campo} i`).classList.add("fa-times-circle");
    document.querySelector(`#${campo} i`).classList.remove("fa-check-circle");
    document.querySelector(`#${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
};

// Función para validar la contraseña 2
const validarPassword2 = () => {
  const inputPassword1 = document.getElementById("password");
  const inputPassword2 = document.getElementById("password2");

  if (inputPassword1.value !== inputPassword2.value) {
    document.getElementById(`contrasena2`).classList.add("formulario__grupo-incorrecto");
    document.getElementById(`contrasena2`).classList.remove("formulario__grupo-correcto");
    document.querySelector(`#contrasena2 i`).classList.add("fa-times-circle");
    document.querySelector(`#contrasena2 i`).classList.remove("fa-check-circle");
    document.querySelector(`#contrasena2 .formulario__input-error`).classList.add("formulario__input-error-activo");
    campos["contrasena2"] = false;
  } else {
    document.getElementById(`contrasena2`).classList.remove("formulario__grupo-incorrecto");
    document.getElementById(`contrasena2`).classList.add("formulario__grupo-correcto");
    document.querySelector(`#contrasena2 i`).classList.remove("fa-times-circle");
    document.querySelector(`#contrasena2 i`).classList.add("fa-check-circle");
    document.querySelector(`#contrasena2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
    campos["contrasena2"] = true;
  }
};

// Función para validar el campo del curso
const validarCampoCurso = (input, campo) => {
  const valor = input.value;

  if (valor !== "") {
    document.getElementById(`${campo}`).classList.remove("formulario__grupo-incorrecto");
    document.getElementById(`${campo}`).classList.add("formulario__grupo-correcto");
    campos[campo] = true;
  } else {
    document.getElementById(`${campo}`).classList.add("formulario__grupo-incorrecto");
    document.getElementById(`${campo}`).classList.remove("formulario__grupo-correcto");
    campos[campo] = false;
  }
};

// Añadir eventos a los inputs y selects del formulario
inputsAndSelects.forEach((inputOrSelect) => {
  inputOrSelect.addEventListener("keyup", validarFormulario);
  inputOrSelect.addEventListener("blur", validarFormulario);
});

// Evento al enviar el formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const terminos = document.getElementById("terminos");

  // Comprobar que todos los campos estén llenos correctamente
  if (
    (campos.cursoProgramacion || campos.cursoIdiomas) &&
    campos.nombre &&
    campos.apellido &&
    campos.usuario &&
    campos.documento &&
    campos.contrasena &&
    campos.correo &&
    campos.cursoProgramacion &&
    campos.cursoIdiomas &&
    terminos.checked
  ) {
    formulario.reset();

    // Mensaje de éxito
    document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
    setTimeout(() => {
      document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
    }, 5000);

    // Resetear estilos de campos correctos
    document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
      icono.classList.remove("formulario__grupo-correcto");
    });

    // Envío del formulario
    formulario.submit();
  } else {
    // Mostrar mensaje de error
    document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
  }
});


