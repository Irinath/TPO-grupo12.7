// const URL = "http://127.0.0.1:5000/"
const URL ="https://tppythong12.pythonanywhere.com/"

  document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault(); 
  
  
    var formData = new FormData();
      formData.append("nombres", document.getElementById("nombres").value);
      formData.append("apellidos", document.getElementById("apellidos").value);
      formData.append("mail", document.getElementById("mail").value);
      formData.append("tipodocumento", document.getElementById("tipodocumento").value);
      formData.append("nrodocumento", document.getElementById("nrodocumento").value);
      formData.append("telefono", document.getElementById("telefono").value);
      formData.append("activo", document.getElementById("activo").value);
     
    
  
    // Realiza una solicitud fetch con el método POST
    fetch(URL + "students",{
          method: "POST",
          body: formData,
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } 
      })
      .then(function (data) {
        alert("Formulario enviado exitosamente");
        document.getElementById("nombres").value="";
        document.getElementById("apellidos").value = "";
        document.getElementById("mail").value = "";
        document.getElementById("tipodocumento").value = "";
        document.getElementById("nrodocumento").value = "";
        document.getElementById("telefono").value = "";
        document.getElementById("activo").value = "";
      
      })

      .catch(function (error) {
        // Maneja errores
        alert("Error:" , error.message);
      });
  });
  