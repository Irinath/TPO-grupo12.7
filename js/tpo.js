/*Código para sección inicio */
function borrar(){
    document.querySelector("#password").value="";
  }

  let flag=true

  function pass(){
    if(flag){
      document.querySelector("#password").type= "password";
      document.querySelector("#pass-icon").src="/imagenes/eye-slash-transp.png"
      flag=false
    } else{
      document.querySelector("#password").type= "text";
      document.querySelector("#pass-icon").src="/imagenes/eye-transp.png";
      flag=true;
    }
  }

/* código de index opiniones */
var contenido = document.querySelector('#contenido');

var frasesPersonalizadas = [
    "Estoy muy contento con la forma de enseñanza de este sitio. Aprendí mucho más rápido de lo que esperaba, y la plataforma es fácil de usar. ¡Altamente recomendado!",
    "Gracias al curso de francés, finalmente logré alcanzar la fluidez que tanto deseaba. Los materiales de estudio son excelentes y los profesores son muy atentos.",
    "La comunidad en línea de este programa es increíble. Conocí a personas de todo el mundo que comparten mi interés por aprender. Nos ayudamos mutuamente y nos alentamos constantemente.",
    "Gracias a este curso, pude cambiar de carrera y entrar en el mundo del desarrollo web. Antes no tenía experiencia en programación, pero ahora tengo confianza en mis habilidades y estoy trabajando en proyectos reales.",
    "Lo que más me gusta de estos cursos es que ofrecen una amplia variedad de temas, desde diseño web hasta programación backend. He estado tomando cursos aquí durante años y sigo aprendiendo y mejorando.",
    "Gracias a lo que aprendí en este curso, pude construir un portafolio impresionante de proyectos web. Esto me ayudó a destacar entre los empleadores y conseguir trabajos freelance."
];


function mostrarResultado() {
  contenido.innerHTML = ''; 

  for (let i = 0; i < frasesPersonalizadas.length; i++) {
      fetch('https://randomuser.me/api')
          .then(res => res.json())
          .then(res => {
              console.log(res);

              let fraseAleatoria = frasesPersonalizadas[i];

              const elemento = document.createElement('div');
              elemento.innerHTML = `
                  <img src="${res.results[0].picture.large}"  >
                  <p>- ${res.results[0].name.first}</p>
                  <p>${fraseAleatoria}</p>
              `;
              contenido.appendChild(elemento);
          });
  }
  }

/* CÓDIGO PARA FORMULARIO  HACER VISIBLE  PW */

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



/* --------------------------------------------------------------------------------------*/
/* ------------------------------VALIDACIÓN FORMULARIO ------------------------------*/
/* --------------------------------------------------------------------------------------*/

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input"); //accede a todos los inputs del form

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, 
  nombre: /^[a-zA-ZÀ-ÿ\s]{3,30}$/, 
  apellido: /^[a-zA-ZÀ-ÿ\s]{2,30}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*]).{8,}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{8,14}$/,
  documento: /^\d{7,8}$/
};

const campos = {
  usuario: false,
  nombre: false,
  apellido: false,
  password: false,
  correo: false,
  telefono: false,
  documento: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "Firstname":  
		validarCampo(expresiones.nombre, e.target, 'nombre');
    	break;
    case "Surname":
    		validarCampo(expresiones.apellido, e.target, 'apellido');
    	break;
    case "username":
    		validarCampo(expresiones.usuario, e.target, 'usuario');
    	break;
    case "ID-number":
    		validarCampo(expresiones.documento, e.target, 'documento');
    	break;
    	case "password":
    		validarCampo(expresiones.password, e.target, 'contrasena');
    		validarPassword2();
    	break;
    	case "password2":
    		validarPassword2();
    	break;
    	case "email":
    		validarCampo(expresiones.correo, e.target, 'correo');
    	break;
    	case "phone-number":
    		validarCampo(expresiones.telefono, e.target, 'telefono');
    	break;
  }
};

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
	document.getElementById(`${campo}`).classList.remove('formulario__grupo-incorrecto');
	document.getElementById(`${campo}`).classList.add("formulario__grupo-correcto");
	document.querySelector(`#${campo} i`).classList.add("fa-check-circle");
	document.querySelector(`#${campo} i`).classList.remove("fa-times-circle");
	document.querySelector(`#${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
	campos[campo] = true;
  } else {
	document.getElementById(`${campo}`).classList.add('formulario__grupo-incorrecto');
	document.getElementById(`${campo}`).classList.remove('formulario__grupo-correcto');
	document.querySelector(`#${campo} i`).classList.add('fa-times-circle');
	document.querySelector(`#${campo} i`).classList.remove('fa-check-circle');
	document.querySelector(`#${campo}  .formulario__input-error`).classList.add('formulario__input-error-activo');
	campos[campo] = false;
  }
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`contrasena2`).classList.add('formulario__grupo-incorrecto');
	document.getElementById(`contrasena2`).classList.remove('formulario__grupo-correcto');
	document.querySelector(`#contrasena2 i`).classList.add('fa-times-circle');
	document.querySelector(`#contrasena2 i`).classList.remove('fa-check-circle');
	document.querySelector(`#contrasena2  .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['contrasena'] = false;
	} else {
    document.getElementById(`contrasena2`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`contrasena2`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#contrasena2 i`).classList.remove('fa-times-circle');
    document.querySelector(`#contrasena2 i`).classList.add('fa-check-circle');
    document.querySelector(`#contrasena2  .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['contrasena'] = true;
	}
}


inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.apellido && campos.usuario && campos.documento && campos.contrasena && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

    document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
		formulario.submit();
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});


